import { Configuration, OpenAIApi } from 'openai'

import { Inject, Injectable } from 'IoC'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'

import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'

import { ESender } from 'components/Chat/types'
import { globalConfig } from 'utils/config'

import { EModel } from '../../classes/OpenAi'

export const IOpenAIServiceTid = Symbol.for('IOpenAIServiceTid')

export interface IOpenAIService {
  init(): void

  generatePrompt(prompt: string, avatarID: string | number): Promise<string>
}

@Injectable()
export class OpenAIService implements IOpenAIService {
  private _config: Configuration
  private _openAIApi: OpenAIApi

  constructor(
    @Inject(IFirebaseServiceTid)
    private readonly _firebaseService: IFirebaseService,
    @Inject(ISystemInfoServiceTid)
    private readonly _systemInfo: ISystemInfoService
  ) {}

  init() {
    this._config = new Configuration({
      apiKey: globalConfig.OPEN_AI_KEY
    })
    this._openAIApi = new OpenAIApi(this._config)
  }

  async generatePrompt(prompt: string, avatarID: string | number) {
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
        avatarID,
        { sender: ESender.BOT, text: `Error occurred ${e}`, date: new Date() },
        true
      )
      console.log(e)
      return 'Some error occurred, now chat is unavailable'
    }
  }

  _checkQuotes(text: string) {
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.replace(/^"|"$/g, '')
    }
    return text
  }
}
