import { Configuration, OpenAIApi } from 'openai'

import { Inject, Injectable } from 'IoC'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'
import { AvatarModel } from 'services/FirebaseService/types'
import { ESender } from 'components/Chat/types'
import { IAppStore, IAppStoreTid } from 'store/AppStore'

export const IOpenAIServiceTid = Symbol.for('IOpenAIServiceTid')

export interface IOpenAIService {
  init(): void

  createCompletion(prompt: string): Promise<string>

  setAvatar(avatar: AvatarModel): void
}

@Injectable()
export class OpenAIService implements IOpenAIService {
  private _config: Configuration
  private _openAIApi: OpenAIApi
  private _history: string
  private _avatar: AvatarModel

  constructor(
    @Inject(IFirebaseServiceTid)
    private readonly _firebaseService: IFirebaseService,
    @Inject(IAppStoreTid) private readonly _appStore: IAppStore
  ) {}

  init() {
    this._config = new Configuration({
      apiKey: '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'
    })
    this._openAIApi = new OpenAIApi(this._config)
  }

  async createCompletion(prompt: string) {
    this._history = `${this._history} \n\n###: ${prompt}. \n\n`

    this._appStore.setHistoryToAvatar(this._avatar.id, this._history)

    try {
      const res = await this._openAIApi.createCompletion({
        model: 'text-davinci-003',
        prompt: this._history,
        temperature: this._avatar.params.temperature,
        max_tokens: this._avatar.params.max_tokens,
        frequency_penalty: this._avatar.params.frequency_penalty,
        presence_penalty: this._avatar.params.presence_penalty,
        stop: ['###']
      })
      this._history = `${this._history} ${res.data.choices[0].text}`

      this._appStore.setHistoryToAvatar(this._avatar.id, this._history)

      return res.data.choices[0].text
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

  setAvatar(avatar: AvatarModel) {
    this._avatar = avatar
    this._history = avatar.messages?.history || ''
  }
}
