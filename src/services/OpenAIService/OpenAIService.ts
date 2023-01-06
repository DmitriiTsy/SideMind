import { Configuration, OpenAIApi } from 'openai'

import { Injectable } from 'IoC'

export const IOpenAIServiceTid = Symbol.for('IOpenAIServiceTid')

export interface IOpenAIService {
  init(): void

  createCompletion(prompt: string): Promise<string>

  clearHistory(): void
}

@Injectable()
export class OpenAIService implements IOpenAIService {
  private _config: Configuration
  private _openAIApi: OpenAIApi
  private _history: string[] = []

  init() {
    this._config = new Configuration({
      apiKey: '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'
    })
    this._openAIApi = new OpenAIApi(this._config)
  }

  async createCompletion(prompt: string) {
    this._history = [...this._history, prompt]
    try {
      const res = await this._openAIApi.createCompletion({
        model: 'text-davinci-003',
        prompt: `${this._history}`,
        temperature: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0.6
      })
      this._history = [...this._history, res.data.choices[0].text]
      return res.data.choices[0].text
    } catch (e) {
      return 'Some error occurred, now chat is unavailable'
    }
  }

  clearHistory() {
    this._history = []
  }
}
