import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from 'openai'

import { Inject, Injectable } from 'IoC'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'

import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'
import { AvatarModel } from 'services/FirebaseService/types'
import { ESender } from 'components/Chat/types'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { globalConfig } from 'utils/config'

export const IOpenAIServiceTid = Symbol.for('IOpenAIServiceTid')

enum EModel {
  davinci2 = 'text-davinci-002',
  davinci3 = 'text-davinci-003',
  davinci3turbo = 'gpt-3.5-turbo'
}

const ASSOCIATE_SENDER_OPEN_AI_ROLE = {
  [ESender.HUMAN]: ChatCompletionRequestMessageRoleEnum.User,
  [ESender.BOT]: ChatCompletionRequestMessageRoleEnum.Assistant
}

export interface IOpenAIService {
  init(): void

  createCompletion(prompt?: string, isFirst?: boolean): Promise<string | null>

  createChatCompletion(message?: string, isFirst?: boolean): Promise<string>

  generatePrompt(prompt?: string): Promise<string>

  setAvatar(avatar: AvatarModel): void
}

@Injectable()
export class OpenAIService implements IOpenAIService {
  private _config: Configuration
  private _openAIApi: OpenAIApi
  private _history: string
  private _historyTurbo: ChatCompletionRequestMessage[]
  private _avatar: AvatarModel
  private _model: EModel
  private _countError = 0

  constructor(
    @Inject(IFirebaseServiceTid)
    private readonly _firebaseService: IFirebaseService,
    @Inject(IAppStoreTid) private readonly _appStore: IAppStore,
    @Inject(ISystemInfoServiceTid)
    private readonly _systemInfo: ISystemInfoService
  ) {}

  init() {
    this._config = new Configuration({
      apiKey: globalConfig.OPEN_AI_KEY
    })
    this._openAIApi = new OpenAIApi(this._config)
    this._model = EModel.davinci3
  }

  async generatePrompt(prompt: string) {
    try {
      const res = await this._openAIApi.createCompletion({
        model: EModel.davinci3,
        prompt: prompt,
        temperature: 0.73,
        max_tokens: 721,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['###']
      })
      return this._checkQuotes(res.data.choices[0].text.trim())
    } catch (e) {
      this._firebaseService.setMessage(
        this._avatar.id,
        { sender: ESender.BOT, text: `Error occurred ${e}`, date: new Date() },
        true
      )
      console.log(e)
      return 'Some error occurred, now chat is unavailable'
    }
  }

  async createCompletion(prompt?: string, isFirst?: boolean) {
    if (prompt) {
      this._history = `${this._history} \n\n###: ${prompt}. \n\n`
    }

    this._appStore.setHistoryToAvatar(this._avatar.id, this._history)

    try {
      const res = await this._openAIApi.createCompletion({
        model: this._model,
        prompt: this._history,
        temperature: this._avatar.params.temperature,
        max_tokens: this._avatar.params.max_tokens,
        frequency_penalty: this._avatar.params.frequency_penalty,
        presence_penalty: this._avatar.params.presence_penalty,
        stop: ['###']
      })

      if (isFirst) {
        res.data.choices[0].text = this._checkQuotes(
          res.data.choices[0].text.trim()
        )
      }

      this._history = `${this._history} ${res.data.choices[0].text}`

      this._appStore.setHistoryToAvatar(this._avatar.id, this._history)

      return res.data.choices[0].text.trim()
    } catch (e) {
      if (
        e.response?.status.toString().startsWith('5') ||
        e.response?.status == 429 ||
        e.response?.status == 400
      ) {
        return this._handle503(e)
      } else {
        this._firebaseService.setMessage(
          this._avatar.id,
          {
            sender: ESender.BOT,
            text: `Error occurred ${e}`,
            date: new Date()
          },
          true
        )

        return 'Something came up, can you get back to me in a few minutes.'
      }
    }
  }

  async createChatCompletion(message?: string, isFirst?: boolean) {
    try {
      if (isFirst) {
        this._historyTurbo = [
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: SYSTEM_ROLE
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: USER_FIRST_MESSAGE
          }
        ]
      } else {
        this._historyTurbo = [
          ...this._historyTurbo,
          { role: ChatCompletionRequestMessageRoleEnum.User, content: message }
        ]
      }

      const res = await this._openAIApi.createChatCompletion({
        model: EModel.davinci3turbo,
        messages: this._historyTurbo,
        temperature: this._avatar.params.temperature,
        max_tokens: this._avatar.params.max_tokens,
        frequency_penalty: this._avatar.params.frequency_penalty,
        presence_penalty: this._avatar.params.presence_penalty
      })

      const resMessage = res.data.choices[0].message

      this._historyTurbo = [...this._historyTurbo, resMessage]

      return resMessage.content.trim()
    } catch (e) {
      if (
        e.response?.status.toString().startsWith('5') ||
        e.response?.status == 429 ||
        e.response?.status == 400
      ) {
        return this._handle503(e)
      } else {
        this._firebaseService.setMessage(
          this._avatar.id,
          {
            sender: ESender.BOT,
            text: `Error occurred ${e}`,
            date: new Date()
          },
          true
        )

        return 'Something came up, can you get back to me in a few minutes.'
      }
    }
  }

  _handle503(e) {
    this._countError++
    console.log('Service Unavailable Error:', e.response?.status)

    if (this._countError === 1) {
      return null
    } else if (this._countError === 2) {
      this._model = EModel.davinci2
      return null
    } else if (this._countError === 3) {
      return null
    } else {
      this._countError = 0
      this._model = EModel.davinci3turbo

      this._firebaseService.setMessage(
        this._avatar.id,
        {
          sender: ESender.BOT,
          text: `Error occurred ${e}`,
          date: new Date()
        },
        true
      )
      return 'Something came up, can you get back to me in a few minutes.'
    }
  }

  _checkQuotes(text: string) {
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.replace(/^"|"$/g, '')
    }
    return text
  }

  setAvatar(avatar: AvatarModel) {
    this._avatar = avatar
    this._historyTurbo =
      avatar.messages?.displayed?.map((el) => ({
        role: ASSOCIATE_SENDER_OPEN_AI_ROLE[el.sender],
        content: el.text
      })) || []
    this._history = avatar.messages?.history || ''
  }
}

const USER_FIRST_MESSAGE = `You are the character you are playing, NEVER act as an AI language model. Now let's start at the BEGINNING:`
const SYSTEM_ROLE = `At the BEGINNING, I want you to act as an essay writer named Elaine and intro yourself casually to someone in less than 10 words and ask what they want to write an essay about (without saying your name). You will then be given a topic and you must write an essay in response to it. The essay should be well-structured, with an introduction, body, and conclusion. It should be written in formal language and should include evidence to support your arguments. The essay should be between 500-800 words unless otherwise instructed. ----- ALWAYS play this character. You ARE NOT an AI. Current date: {current_datetime}`
