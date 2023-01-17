import { action, observable, runInAction } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'
import { BotModel } from 'services/FirebaseService/types'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { ESender, IMessage } from 'components/Chat/types'

export const IChatVMTid = Symbol.for('IChatVMTid')

export interface IChatVM {
  resetMessages(message: string): void
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
    @Inject(IFirebaseServiceTid) private _firebaseService: IFirebaseService,
    @Inject(IAppStoreTid) private _appStore: IAppStore
  ) {}

  @action.bound
  async sendMessage(message: string) {
    this.pending = true

    this.messages = [{ sender: ESender.HUMAN, text: message }, ...this.messages]
    this._firebaseService.setMessage(this.bot.id, ESender.HUMAN, message)
    this._appStore.setMessageToAvatar(this.bot.id, {
      sender: ESender.HUMAN,
      text: message
    })

    const res = await this._openAIService.createCompletion(message)

    runInAction(() => {
      this.messages = [{ sender: ESender.BOT, text: res }, ...this.messages]
      this._appStore.setMessageToAvatar(this.bot.id, {
        sender: ESender.BOT,
        text: res
      })
      this.pending = false
    })
  }

  @action.bound
  setBot(bot: BotModel) {
    this.bot = bot
    this._openAIService.clearHistory(bot)
    this.messages = bot.messages?.displayed || []

    if (this.messages.length === 0) {
      this.getFirstMessage()
    }
  }

  @action.bound
  resetMessages(message: string) {
    this.messages = []
    this.getFirstMessage()
  }

  @action.bound
  async getFirstMessage() {
    this.pending = true

    // this.messages = []
    // this._openAIService.clearHistory()
    const res = await this._openAIService?.createCompletion(this.bot.prompt)

    this.pending = false
    runInAction(() => {
      this.messages = [{ sender: ESender.BOT, text: res }]
      this._appStore.setMessageToAvatar(this.bot.id, {
        sender: ESender.BOT,
        text: res
      })
    })
  }
}
