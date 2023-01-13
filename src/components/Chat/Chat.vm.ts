import { action, observable, runInAction } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'
import { BotModel } from 'services/FirebaseService/types'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'

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
    @Inject(IOpenAIServiceTid) private _openAIService: IOpenAIService,
    @Inject(IFirebaseServiceTid) private _firebaseService: IFirebaseService
  ) {}

  @action.bound
  async sendMessage(message: string) {
    this.pending = true

    this.messages = [{ sender: ESender.HUMAN, text: message }, ...this.messages]
    this._firebaseService.setMessage(this.bot.id, ESender.HUMAN, message)

    const res = await this._openAIService.createCompletion(message, this.bot)

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
    this.pending = true

    this.messages = []
    this._openAIService.clearHistory()
    const res = await this._openAIService.createCompletion(
      this.bot.prompt,
      this.bot
    )

    this.pending = false
    runInAction(() => (this.messages = [{ sender: ESender.BOT, text: res }]))
  }
}
