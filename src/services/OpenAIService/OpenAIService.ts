import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from 'openai'

import dayjs from 'dayjs'

import { Inject, Injectable } from 'IoC'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'

import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'
import {
  AvatarModel,
  EAvatarsCategory,
  ITurboInit
} from 'services/FirebaseService/types'
import { ESender } from 'components/Chat/types'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { globalConfig } from 'utils/config'

export const IOpenAIServiceTid = Symbol.for('IOpenAIServiceTid')

const TOKEN_LENGTH_ERROR = 'context_length_exceeded'
const DATE_FORMAT = 'MM-DD-YYYY'

export enum EModel {
  davinci2 = 'text-davinci-002',
  davinci3 = 'text-davinci-003',
  davinci3turbo = 'gpt-3.5-turbo'
}

export interface IOpenAIService {
  init(): void

  createCompletion(
    prompt?: string,
    isFirst?: boolean,
    resetFromTurbo?: boolean
  ): Promise<string | Error>

  createChatCompletion(message?: string | ITurboInit): Promise<string | Error>

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

  async createCompletion(
    prompt?: string,
    isFirst?: boolean,
    resendFromTurbo?: boolean
  ) {
    prompt && (this._history = `${this._history} \n\n###: ${prompt}. \n\n`)

    !resendFromTurbo &&
      this._appStore.setHistoryToAvatar(this._avatar.id, this._history)

    try {
      const res = await this._openAIApi.createCompletion({
        model: this._model,
        prompt: resendFromTurbo
          ? this._history.replace(
              /{current_datetime}/m,
              dayjs().format(DATE_FORMAT)
            )
          : this._history,
        temperature: this._avatar.params.temperature,
        max_tokens: this._avatar.params.max_tokens,
        frequency_penalty: this._avatar.params.frequency_penalty,
        presence_penalty: this._avatar.params.presence_penalty,
        stop: ['###']
      })

      let { text } = res.data.choices[0]

      if (isFirst) {
        text = this._checkQuotes(text.trim())
      }
      if (resendFromTurbo) {
        this._historyTurbo.push({
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content: text
        })
      }
      this._history = `${this._history} ${text}`

      this._appStore.setHistoryToAvatar(this._avatar.id, this._history)

      return text.trim()
    } catch (e) {
      return this._handleWithReset(e)
    }
  }

  async createChatCompletion(message?: string | ITurboInit) {
    try {
      if (typeof message === 'string') {
        this._historyTurbo = [
          ...this._historyTurbo,
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: message + '.'
          }
        ]
        this._appStore.setHistoryToAvatar(this._avatar.id, this._historyTurbo)
      } else if (message) {
        this._historyTurbo = [
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: message.system
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: message.user
          }
        ]
        this._appStore.setHistoryToAvatar(this._avatar.id, this._historyTurbo)
      }

      const messages = this._historyTurbo

      if (this._avatar.category !== EAvatarsCategory.Custom) {
        messages[0].content = messages[0].content.replace(
          /{current_datetime}/m,
          dayjs().format(DATE_FORMAT)
        )
      }

      const res = await this._openAIApi.createChatCompletion({
        model: EModel.davinci3turbo,
        messages,
        temperature: this._avatar.params.temperature,
        max_tokens: this._avatar.params.max_tokens,
        frequency_penalty: this._avatar.params.frequency_penalty,
        presence_penalty: this._avatar.params.presence_penalty
      })

      const resMessage = res.data.choices[0].message
      this._historyTurbo = [...this._historyTurbo, resMessage]

      this._appStore.setHistoryToAvatar(this._avatar.id, this._historyTurbo)

      return resMessage.content.trim()
    } catch (e) {
      return this._handleWithReset(e, true)
    }
  }

  _handleWithReset(e, turbo?: boolean) {
    if (e.response?.data?.error?.code === TOKEN_LENGTH_ERROR) {
      this._handleTokenLength()

      return this.createChatCompletion()
    } else if (
      e.response?.status.toString().startsWith('5') ||
      e.response?.status == 429 ||
      e.response?.status == 400
    ) {
      turbo && this._convertHistoryTurboToHistory()

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

  _handle503(e) {
    this._countError++
    console.log('Service Unavailable Error:', e.response?.status)

    if (this._countError === 1) {
      return new Error('Service Unavailable')
    } else if (this._countError === 2) {
      this._model = EModel.davinci2
      return new Error('Service Unavailable')
    } else if (this._countError === 3) {
      return new Error('Service Unavailable')
    } else {
      this._countError = 0
      this._model = EModel.davinci3

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

  _convertHistoryTurboToHistory() {
    this._history = this._historyTurbo
      .map(
        (el, index) =>
          `${el.content} ${
            this._avatar.category !== EAvatarsCategory.Custom && index === 0
              ? '\n'
              : '\n\n###: \n\n'
          }`
      )
      .join('')
  }

  _handleTokenLength() {
    if (this._avatar.category === EAvatarsCategory.Custom) {
      this._historyTurbo.splice(1, 1)
    } else {
      this._historyTurbo.splice(2, 1)
    }

    this._appStore.setHistoryToAvatar(this._avatar.id, this._historyTurbo)
  }

  _checkQuotes(text: string) {
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.replace(/^"|"$/g, '')
    }
    return text
  }

  setAvatar(avatar: AvatarModel) {
    this._avatar = avatar
    this._historyTurbo = avatar.messages?.historyTurbo || []
    this._history = avatar.messages?.history || ''
  }
}
