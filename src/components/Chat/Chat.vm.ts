import { action, observable, runInAction } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'
import { AvatarModel } from 'services/FirebaseService/types'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { ESender, IMessage } from 'components/Chat/types'

export const IChatVMTid = Symbol.for('IChatVMTid')

export interface IChatVM {
  messages: IMessage[]
  avatar: AvatarModel
  pending: boolean
  resetting: boolean

  changeResetState(value: boolean): void
  sendMessage(message: string): void
  setAvatar(avatar: AvatarModel): void
  getFirstMessage(): void
  resetMessages(): void
}

@Injectable()
export class ChatVM implements IChatVM {
  @observable messages: IMessage[] = []
  @observable avatar: AvatarModel
  @observable pending = false
  @observable resetting = false

  constructor(
    @Inject(IOpenAIServiceTid) private _openAIService: IOpenAIService,
    @Inject(IFirebaseServiceTid) private _firebaseService: IFirebaseService,
    @Inject(IAppStoreTid) private _appStore: IAppStore
  ) {}

  @action.bound
  async sendMessage(message: string) {
    this.pending = true

    const humanMessage = {
      sender: ESender.HUMAN,
      text: message,
      date: new Date()
    }

    this.messages = [humanMessage, ...this.messages]
    this._appStore.setMessageToAvatar(this.avatar.id, humanMessage)

    const res = await this._openAIService.createCompletion(message)

    runInAction(() => {
      const botMessage = { sender: ESender.BOT, text: res, date: new Date() }

      this.messages = [botMessage, ...this.messages]
      this._appStore.setMessageToAvatar(this.avatar.id, botMessage)

      this.pending = false
    })
  }

  @action.bound
  setAvatar(avatar: AvatarModel) {
    this.avatar = avatar
    this._openAIService.setAvatar(avatar)
    this.messages = avatar.messages?.displayed || []
    this.getFirstMessage()
    if (this.messages.length === 0) {
      this.getFirstMessage()
    }
  }

  @action.bound
  async resetMessages() {
    this.pending = true

    this.messages = []

    this.setAvatar(await this._appStore.resetMessages(this.avatar.id))
  }

  @action.bound
  async getFirstMessage() {
    this.pending = true

    const res = await this._openAIService?.createCompletion(
      this.avatar.prompt,
      true
    )

    this.pending = false
    runInAction(() => {
      const botMessage = { sender: ESender.BOT, text: res, date: new Date() }

      this.messages = [botMessage]
      this._appStore.setMessageToAvatar(this.avatar.id, botMessage)
    })
  }

  @action.bound
  changeResetState(value: boolean) {
    this.resetting = value
  }
}
