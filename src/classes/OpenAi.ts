import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

import { globalConfig } from 'utils/config'
import { IAvatarModelParams } from 'services/FirebaseService/types'
import axios from 'axios'

export enum EModel {
  davinci2 = 'text-davinci-002',
  davinci3 = 'text-davinci-003',
  davinci3turbo = 'gpt-3.5-turbo'
}

export class OpenAi {
  private _config: Configuration
  private _openAiApi: OpenAIApi
  protected _model: EModel
  private _countOfError = 0
  protected readonly ERROR_TOKEN_LENGTH = 'context_length_exceeded'
  protected readonly ERROR_SERVICE_UNAVAILABLE = 'Service Unavailable'
  protected readonly ERROR_SERVICE_UNAVAILABLE_FATAL =
    'Service Unavailable Fatal'

  constructor() {
    this.init().catch((error: string) => {
      throw new Error(error)
    })
  }

  protected async init() {
    try {
      const credentials = (await axios.get(
        globalConfig.SIDEMIND_CREDENTAILS
      )) as { data: string }

      this._config = new Configuration({
        apiKey: credentials['data']['OPENAI_KEY']
      })

      this._openAiApi = new OpenAIApi(this._config)
      this._model = EModel.davinci3
    } catch (error: any) {
      throw 'Open ai failed to initialize'
    }
  }

  protected async createCompletion(prompt: string, params: IAvatarModelParams) {
    try {
      const res = await this._openAiApi.createCompletion({
        model: this._model,
        prompt,
        temperature: params.temperature,
        max_tokens: params.max_tokens,
        frequency_penalty: params.frequency_penalty,
        presence_penalty: params.presence_penalty,
        stop: ['###']
      })

      return res.data.choices[0].text
    } catch (e) {
      return this._handleUnexpectedError(e)
    }
  }

  protected async createChatCompletion(
    messages: ChatCompletionRequestMessage[],
    params: IAvatarModelParams
  ) {
    try {
      const res = await this._openAiApi.createChatCompletion({
        model: EModel.davinci3turbo,
        messages,
        temperature: params.temperature,
        max_tokens: params.max_tokens,
        frequency_penalty: params.frequency_penalty,
        presence_penalty: params.presence_penalty
      })

      return res.data.choices[0].message
    } catch (e) {
      if (e.response?.data?.error?.code === this.ERROR_TOKEN_LENGTH) {
        return new Error(this.ERROR_TOKEN_LENGTH)
      }
      return this._handleUnexpectedError(e)
    }
  }

  private async _handleUnexpectedError(e) {
    if (
      e.response?.status.toString().startsWith('5') ||
      e.response?.status == 429 ||
      e.response?.status == 400
    ) {
      this._countOfError++

      if (this._countOfError === 1) {
        return new Error(this.ERROR_SERVICE_UNAVAILABLE)
      } else if (this._countOfError === 2) {
        this._model = EModel.davinci2

        return new Error(this.ERROR_SERVICE_UNAVAILABLE)
      } else if (this._countOfError === 3) {
        return new Error(this.ERROR_SERVICE_UNAVAILABLE)
      } else {
        this._countOfError = 0
        this._model = EModel.davinci3

        return new Error(this.ERROR_SERVICE_UNAVAILABLE_FATAL)
      }
    } else {
      return new Error(this.ERROR_SERVICE_UNAVAILABLE_FATAL)
    }
  }
}
