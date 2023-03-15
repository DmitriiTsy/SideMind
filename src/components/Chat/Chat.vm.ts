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

  getSharedAvatar(avatarId: string, general: boolean, starting: boolean): void

  removeAvatar(): void
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
    if (this.avatar?.deleted) return

    this.pending = true

    const humanMessage = {
      sender: ESender.HUMAN,
      text: message,
      date: new Date()
    }

    this.messages = [humanMessage, ...this.messages]
    this._appStore.setMessageToAvatar(this.avatar.id, humanMessage)

    let res = await this._openAIService.createCompletion(message)

    while (!res) {
      res = await this._resend()
    }

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
    if (this.avatar?.deleted) return

    this.pending = true

    let res = await this._openAIService?.createCompletion(
      this.avatar.prompt,
      true
    )

    while (!res) {
      res = await this._resend()
    }

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

  @action.bound
  async _resend() {
    this.pending = false
    setTimeout(() => runInAction(() => (this.pending = true)), 500)

    return await this._openAIService.createCompletion()
  }

  async getSharedAvatar(avatarId: string, general: boolean, starting: boolean) {
    const avatar = await this._appStore.getSharedAvatar(
      avatarId,
      general,
      starting
    )

    if (avatar) {
      this.setAvatar(avatar)
    }
  }

  @action.bound
  removeAvatar() {
    this.avatar = undefined
  }
}
