import { Configuration, OpenAIApi } from 'openai'

import { Injectable, useInject } from 'IoC'
import { BotModel } from 'services/FirebaseService/types'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
export const IOpenAIServiceTid = Symbol.for('IOpenAIServiceTid')

export interface IOpenAIService {
  init(): void

  createCompletion(prompt: string): Promise<string>

  clearHistory(): void
}

export const AppStoreValue = () => {
  const appStore = useInject<IAppStore>(IAppStoreTid)
  return appStore
}
interface IBotProps {
  bot: BotModel
}

@Injectable()
export class OpenAIService implements IOpenAIService {
  private _config: Configuration
  private _openAIApi: OpenAIApi
  private _history: string
  appStore = AppStoreValue()
  
  init() {
    this._config = new Configuration({
      apiKey: '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'
    })
    this._openAIApi = new OpenAIApi(this._config)
  }

  async createCompletion(prompt: string) {
    this._history = `${this._history} \n\n###: ${prompt}. \n\n`
    try {
      const res = await this._openAIApi.createCompletion({
        model: 'text-davinci-003',
        prompt: this._history,
        temperature: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: ['###']
      })
      this._history = `${this._history} ${res.data.choices[0].text}`
      return res.data.choices[0].text
    } catch (e) {
      console.log(e)
      return 'Some error occurred, now chat is unavailable'
    }
  }

  clearHistory() {
    this._history = ''
  }
}
