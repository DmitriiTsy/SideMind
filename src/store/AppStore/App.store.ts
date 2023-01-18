import { action, observable, runInAction } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { AvatarModel } from 'services/FirebaseService/types'
import { IStorageService, IStorageServiceTid } from 'services/StorageService'
import { IMessage } from 'components/Chat/types'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'

export const IAppStoreTid = Symbol.for('IAppStoreTid')

export interface IAppStore {
  usersAvatars: AvatarModel[]

  startingAvatars: AvatarModel[][]
  commonAvatars: AvatarModel[][]

  init(): void

  getCommonAvatars(): void
  getStartingAvatars(): void

  setUsersAvatars(id: number[]): void
  updateUsersAvatars(avatar: AvatarModel): void

  setAvatarsFromStorage(): void

  setMessageToAvatar(avatarId: number, message: IMessage): void
  setHistoryToAvatar(avatarId: number, history: string): void

  setResetMessages(avatarId: number, message: IMessage): void

}

@Injectable()
export class AppStore implements IAppStore {
  @observable usersAvatars: AvatarModel[] = []

  @observable startingAvatars: AvatarModel[][] = []
  @observable commonAvatars: AvatarModel[][] = []

  constructor(
    @Inject(IStorageServiceTid)
    private readonly _storageService: IStorageService,
    @Inject(IFirebaseServiceTid)
    private readonly _firebaseService: IFirebaseService
  ) {}

  init() {
    this.getCommonAvatars()
    this.getStartingAvatars()
  }

  async getCommonAvatars() {
    const avatars = await this._firebaseService.getCommonAvatars()
    runInAction(() => (this.commonAvatars = avatars))
  }

  async getStartingAvatars() {
    const avatars = await this._firebaseService.getStartingAvatars()
    runInAction(() => (this.startingAvatars = avatars))
  }

  @action.bound
  setUsersAvatars(id: number[]) {
    this._storageService.setUserLogin()
    const _avatars: AvatarModel[] = []
    this.commonAvatars.map((avatars) =>
      avatars.map((avatar) => id.includes(avatar.id) && _avatars.push(avatar))
    )
    this.startingAvatars.map((bots) => bots.map((bot) => _avatars.unshift(bot)))
    this.usersAvatars = _avatars
    this._storageService.setUserAvatars(this.usersAvatars)
    this._firebaseService.setAvatars(this.usersAvatars)
  }

  @action.bound
  updateUsersAvatars(avatar: AvatarModel) {
    const exist = this.usersAvatars.find((el) => el.id === avatar.id)
    if (!exist) {
      this.usersAvatars = [avatar, ...this.usersAvatars]
      this._storageService.setUserAvatars(this.usersAvatars)
      this._firebaseService.updateAvatars(avatar.id)
    }
  }

  @action.bound
  setAvatarsFromStorage() {
    this.usersAvatars = this._storageService.getUserAvatars()
  }

  setResetMessages(avatarId: number, history: string) {
    this.usersAvatars = this.usersAvatars.map((el) => {
      if (el.id === avatarId) {
        el.messages = { displayed: [], history: '' }
      }
      return el
    })
  }

  setMessageToAvatar(avatarId: number, message: IMessage) {
    this.usersAvatars = this.usersAvatars.map((el) => {
      if (el.id === avatarId) {
        if (!el.messages) el.messages = { displayed: [], history: '' }
        el.messages.displayed = [message, ...el.messages.displayed]
      }
      return el
    })
    this._firebaseService.setMessage(avatarId, message)
    this._storageService.setUserAvatars(this.usersAvatars)
  }

  setHistoryToAvatar(avatarId: number, history: string) {
    this.usersAvatars = this.usersAvatars.map((el) => {
      if (el.id === avatarId) {
        if (!el.messages) el.messages = { displayed: [], history: '' }
        el.messages.history = history
      }
      return el
    })
  }
}
