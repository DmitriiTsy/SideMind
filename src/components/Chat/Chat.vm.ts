import { action, observable } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'
import { AvatarModel } from 'services/FirebaseService/types'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { IMessage } from 'components/Chat/types'

import { IAvatar } from '../../classes/Avatar'

export const IChatVMTid = Symbol.for('IChatVMTid')

export interface IChatVM {
  messages: IMessage[]
  avatar: AvatarModel
  pending: boolean
  resetting: boolean
  id: string | number

  changeResetState(value: boolean): void
  sendMessage(message: string): void
  setAvatar(avatar: IAvatar): void
  resetMessages(): void

  getSharedAvatar(avatarId: string, general: boolean, starting: boolean): void
}

@Injectable()
export class ChatVM implements IChatVM {
  @observable messages: IMessage[] = []
  @observable avatar: AvatarModel
  @observable pending = false
  @observable resetting = false
  @observable id: string | number

  constructor(
    @Inject(IOpenAIServiceTid) private _openAIService: IOpenAIService,
    @Inject(IFirebaseServiceTid) private _firebaseService: IFirebaseService,
    @Inject(IAppStoreTid) private _appStore: IAppStore
  ) {}

  @action.bound
  async sendMessage(message: string) {
    this._appStore.usersAvatars.map(
      (el) => el.data.id === this.id && el.sendMessage(message)
    )
  }

  @action.bound
  setAvatar(avatar: IAvatar) {
    this.id = avatar.data.id
    this.avatar = avatar.data

    this._appStore.usersAvatars.map(
      (el) =>
        el.data.id === avatar.data.id &&
        el.data.messages.displayed.length === 0 &&
        el.getFirstMessage()
    )
  }

  @action.bound
  async resetMessages() {
    this._appStore.usersAvatars.map(
      (el) => el.data.id === this.id && el.reset()
    )
  }

  @action.bound
  changeResetState(value: boolean) {
    this.resetting = value
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
}
