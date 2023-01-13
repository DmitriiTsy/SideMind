import { Configuration, OpenAIApi } from 'openai'

import { Injectable } from 'IoC'
import { BotModel } from 'services/FirebaseService/types'
export const IOpenAIServiceTid = Symbol.for('IOpenAIServiceTid')

export interface IOpenAIService {
  init(): void

  createCompletion(prompt: string, bot: BotModel): Promise<string>

  clearHistory(): void
}

@Injectable()
export class OpenAIService implements IOpenAIService {
  private _config: Configuration
  private _openAIApi: OpenAIApi
  private _history: string

  init() {
    this._config = new Configuration({
      apiKey: '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'
    })
    this._openAIApi = new OpenAIApi(this._config)
  }

  async createCompletion(prompt: string, bot: BotModel) {
    this._history = `${this._history} \n\n###: ${prompt}. \n\n`
    try {
      const res = await this._openAIApi.createCompletion({
        model: 'text-davinci-003',
        prompt: this._history,
        temperature: bot.params.temperature,
        max_tokens: bot.params.max_tokens,
        frequency_penalty: bot.params.frequency_penalty,
        presence_penalty: bot.params.presence_penalty,
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
