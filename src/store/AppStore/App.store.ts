import { action, observable, runInAction } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { AvatarModel } from 'services/FirebaseService/types'
import { IStorageService, IStorageServiceTid } from 'services/StorageService'
import { ESender, IMessage } from 'components/Chat/types'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'

export const IAppStoreTid = Symbol.for('IAppStoreTid')

export interface IAppStore {
  usersAvatars: AvatarModel[]

  startingAvatars: AvatarModel[][]
  commonAvatars: AvatarModel[][]

  init(): void

  setUsersAvatars(id: number[]): void
  updateUsersAvatars(avatar: AvatarModel): AvatarModel | null

  setAvatarsFromStorage(): void

  setMessageToAvatar(avatarId: number, message: IMessage): void
  setHistoryToAvatar(avatarId: number, history: string): void

  resetMessages(avatarId: number): Promise<AvatarModel>

  updateAvatarsFromFirebase(): void
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
    this._getCommonAvatars()
    this._getStartingAvatars()
  }

  async _getCommonAvatars() {
    const avatars = await this._firebaseService.getCommonAvatars(true)
    runInAction(() => (this.commonAvatars = avatars))
  }

  async _getStartingAvatars() {
    const avatars = await this._firebaseService.getStartingAvatars(true)
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
    const _avatar = this.usersAvatars.find((el) => el.id === avatar.id)
    if (!_avatar) {
      this.usersAvatars = [avatar, ...this.usersAvatars]
      // this._storageService.setUserAvatars(this.usersAvatars)
      this._firebaseService.updateAvatars(avatar.id)
      return null
    }
    return _avatar
  }

  @action.bound
  setAvatarsFromStorage() {
    this.usersAvatars = this._storageService.getUserAvatars()
  }

  @action.bound
  async resetMessages(avatarId: number) {
    await this.updateAvatarsFromFirebase()

    this.usersAvatars = this.usersAvatars.map((el) => {
      if (el.id === avatarId) {
        el.messages = { displayed: [], history: '' }
      }
      return el
    })
    this._firebaseService.setMessage(avatarId, {
      sender: ESender.RESET,
      text: '',
      date: new Date()
    })
    this._storageService.setUserAvatars(this.usersAvatars)

    return this.usersAvatars.find((avatar) => avatar.id === avatarId)
  }

  setMessageToAvatar(avatarId: number, message: IMessage) {
    this.usersAvatars = this.usersAvatars.map((el) => {
      if (el.id === avatarId) {
        if (!el.messages) el.messages = { displayed: [], history: '' }
        el.messages.displayed = [message, ...el.messages.displayed]
      }
      return el
    })

    this._sortToFirst(avatarId)

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

  _sortToFirst(avatarId: number) {
    const index = this.usersAvatars.findIndex((el) => el.id === avatarId)
    const _avatar = this.usersAvatars[index]
    this.usersAvatars.splice(index, 1)
    this.usersAvatars.unshift(_avatar)
  }

  async updateAvatarsFromFirebase() {
    const [commonAvatars, startingAvatars] = await Promise.all([
      this._firebaseService.getCommonAvatars(),
      this._firebaseService.getStartingAvatars()
    ])

    runInAction(() => {
      this.commonAvatars = this._mapUpdateStoreAvatarsFromFirebase(
        this.commonAvatars,
        commonAvatars
      )
      this.startingAvatars = this._mapUpdateStoreAvatarsFromFirebase(
        this.startingAvatars,
        startingAvatars
      )

      this._mapUpdateUsersAvatarsFromFirebase()
    })
  }

  _mapUpdateStoreAvatarsFromFirebase(
    avatarsStore: AvatarModel[][],
    avatarsFirebase: AvatarModel[][]
  ) {
    return avatarsStore.map((avatarsGroup, groupIndex) =>
      avatarsGroup.map((avatar) => {
        const _avatar = avatarsFirebase[groupIndex].find(
          (el) => el.id === avatar.id
        )
        return {
          ...avatar,
          name: _avatar.name,
          tagLine: _avatar.tagLine,
          prompt: _avatar.prompt
        }
      })
    )
  }

  @action.bound
  _mapUpdateUsersAvatarsFromFirebase() {
    const commonAvatarsList: AvatarModel[] = []
    const startingAvatarsList: AvatarModel[] = []

    this.commonAvatars.map((avatarsGroup) =>
      avatarsGroup.map((avatar) => commonAvatarsList.push(avatar))
    )
    this.startingAvatars.map((avatarsGroup) =>
      avatarsGroup.map((avatar) => startingAvatarsList.push(avatar))
    )

    this.usersAvatars = this.usersAvatars.map((avatar) => {
      const startingAvatar = startingAvatarsList.find(
        (el) => el.id === avatar.id
      )
      if (startingAvatar) {
        return {
          ...avatar,
          name: startingAvatar.name,
          tagLine: startingAvatar.tagLine,
          prompt: startingAvatar.prompt
        }
      } else {
        const commonAvatar = commonAvatarsList.find((el) => el.id === avatar.id)
        return {
          ...avatar,
          name: commonAvatar.name,
          tagLine: commonAvatar.tagLine,
          prompt: commonAvatar.prompt
        }
      }
    })
    this._storageService.setUserAvatars(this.usersAvatars)
  }
}
