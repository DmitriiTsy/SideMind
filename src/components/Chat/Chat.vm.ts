import { action, observable, runInAction } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'
import { BotModel } from 'services/FirebaseService/types'

export const IChatVMTid = Symbol.for('IChatVMTid')

export enum ESender {
  BOT = 'BOT',
  HUMAN = 'HUMAN'
}

export interface IMessage {
  sender: ESender
  text: string
}

export interface IChatVM {
  messages: IMessage[]
  bot: BotModel
  pending: boolean

  sendMessage(message: string): void
  setBot(bot: BotModel): void
  getFirstMessage(): void
}

@Injectable()
export class ChatVM implements IChatVM {
  @observable messages: IMessage[] = []
  @observable bot: BotModel
  @observable pending = false

  constructor(
    @Inject(IOpenAIServiceTid) private _openAIService: IOpenAIService
  ) {}

  @action.bound
  async sendMessage(message: string) {
    this.pending = true

    this.messages = [{ sender: ESender.HUMAN, text: message }, ...this.messages]
    const res = await this._openAIService.createCompletion(message)
    runInAction(() => {
      this.messages = [{ sender: ESender.BOT, text: res }, ...this.messages]
      this.pending = false
    })
  }

  @action.bound
  setBot(bot: BotModel) {
    this.bot = bot
  }

  async getFirstMessage() {
    this.messages = []
    this._openAIService.clearHistory()
    const res = await this._openAIService.createCompletion(this.bot.prompt)
    runInAction(() => (this.messages = [{ sender: ESender.BOT, text: res }]))
  }
}
