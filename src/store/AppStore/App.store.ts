import { action, observable, runInAction } from 'mobx'

import { flatten, merge } from 'lodash'

import { ChatCompletionRequestMessage } from 'openai'

import Rate from 'react-native-rate'

import dayjs from 'dayjs'

import { Inject, Injectable } from 'IoC'
import { AvatarModel, EAvatarsCategory } from 'services/FirebaseService/types'
import { IStorageService, IStorageServiceTid } from 'services/StorageService'
import { ESender, IMessage } from 'components/Chat/types'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'
import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'
import { EModel } from 'services/OpenAIService'
import { RATE_CONFIG } from 'constants/rateConfig'

export const IAppStoreTid = Symbol.for('IAppStoreTid')

export interface IAppStore {
  usersAvatars: AvatarModel[]

  startingAvatars: AvatarModel[][]
  commonAvatars: AvatarModel[][]

  init(): Promise<void>

  setUsersAvatars(avatar: AvatarModel): void

  updateUsersAvatars(avatar: AvatarModel): AvatarModel | null
  updateUsersAvatars(
    avatar: AvatarModel,
    imagePath: string,
    localPath: string
  ): AvatarModel | null

  editCustomAvatar(editedAvatar: AvatarModel, localPath?: string): Promise<void>

  setAvatarsFromStorage(): void

  setMessageToAvatar(avatarId: number | string, message: IMessage): void
  setHistoryToAvatar(
    avatarId: number | string,
    history: string | ChatCompletionRequestMessage[]
  ): void

  resetMessages(avatarId: number | string | number[]): Promise<AvatarModel>

  updateAvatarsFromFirebase(): void

  getSharedAvatar(
    avatarId: string,
    general: boolean,
    starting: boolean
  ): Promise<AvatarModel | null>

  removeCustomAvatar(avatarId: string | number): void

  setStartingAvatars(): void
}

@Injectable()
export class AppStore implements IAppStore {
  @observable usersAvatars: AvatarModel[] = []

  @observable startingAvatars: AvatarModel[][] = []
  @observable commonAvatars: AvatarModel[][] = []

  private _countMessages = 0

  constructor(
    @Inject(IStorageServiceTid)
    private readonly _storageService: IStorageService,
    @Inject(IFirebaseServiceTid)
    private readonly _firebaseService: IFirebaseService,
    @Inject(ISystemInfoServiceTid)
    private readonly _systemInfoService: ISystemInfoService
  ) {}

  async init() {
    await this._getCommonAvatars()
    await this._getStartingAvatars()
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
  setUsersAvatars(avatar: AvatarModel) {
    this._storageService.setUserLogin()

    const _avatars: AvatarModel[] = [avatar]
    this.startingAvatars.map((bots) => bots.map((bot) => _avatars.unshift(bot)))
    this.usersAvatars = _avatars

    this._storageService.setUserAvatars(this.usersAvatars)
    this._firebaseService.setAvatars(this.usersAvatars)
  }

  async updateUsersAvatars(avatar: AvatarModel)
  async updateUsersAvatars(
    avatar: AvatarModel,
    imagePath?: string,
    localPath?: string
  ) {
    const _avatar = this.usersAvatars.find((el) => el.id === avatar.id)
    if (!_avatar) {
      if (typeof imagePath === 'string' && typeof localPath === 'string') {
        avatar.uri = await this._firebaseService.createCustomAvatar(
          avatar,
          imagePath,
          localPath
        )
      }

      runInAction(() => {
        this.usersAvatars.unshift(avatar)
        this._storageService.setUserAvatars(this.usersAvatars)
        this._firebaseService.updateAvatars(avatar.id)
      })

      return null
    }
    return _avatar
  }

  @action.bound
  async editCustomAvatar(
    editedAvatar: AvatarModel,
    localPath?: string
  ): Promise<void> {
    const _avatar = this.usersAvatars.find((el) => el.id === editedAvatar.id)

    const oldAvatar: AvatarModel = {
      name: _avatar.name,
      tagLine: _avatar.tagLine,
      imagePath: _avatar.imagePath,
      category: _avatar.category,
      id: _avatar.id,
      prompt: _avatar.prompt,
      params: _avatar.params,
      bio: _avatar.bio
    }

    const uri = await this._firebaseService.editCustomAvatar(
      oldAvatar,
      editedAvatar,
      localPath
    )

    runInAction(() => {
      this.usersAvatars = this.usersAvatars.map((el) => {
        if (el.id === editedAvatar.id) {
          return {
            ...editedAvatar,
            uri: uri ? uri : el.uri
          }
        }
        return el
      })
      this._storageService.setUserAvatars(this.usersAvatars)
    })
  }

  @action.bound
  setAvatarsFromStorage() {
    this.usersAvatars = this._storageService.getUserAvatars().map((el) => {
      if (!el.uri) {
        el.uri = el.imagePath
      }
      return el
    })

    //additional field in avatars obj for supporting chat with old model open ai
    //release v1.3.4
    if (!this._storageService.getAddedFieldsForOldAvatars()) {
      this.usersAvatars = this.usersAvatars.map((el) => {
        if (el.messages?.displayed?.length > 0) {
          return {
            ...el,
            isAvatarUseModel3: true
          }
        }
        return el
      })
      this._storageService.setAddedFieldsForOldAvatars()
      this._storageService.setUserAvatars(this.usersAvatars)
    }

    //move custom avatars in new Collection in firestore
    //release v1.3.4
    if (!this._storageService.getCustomAvatarsInCustomList()) {
      const _customAvatars: AvatarModel[] = []
      this.usersAvatars.map((el) => {
        if (el.category === EAvatarsCategory.Custom) {
          _customAvatars.push(el)
        }
      })
      setTimeout(() => {
        this._firebaseService.moveCustomAvatarsToNewList(_customAvatars)
        this._storageService.setCustomAvatarsInCustomList()
      }, 100)
    }
  }

  @action.bound
  async resetMessages(avatarId: number) {
    await this.updateAvatarsFromFirebase()

    this.usersAvatars = this.usersAvatars.map((el) => {
      if (el.id === avatarId) {
        el.messages = { displayed: [], history: '' }
        el.isAvatarUseModel3 = undefined
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
    message.sender === ESender.HUMAN && this._handleRate()

    let model: EModel
    this.usersAvatars = this.usersAvatars.map((el) => {
      if (el.id === avatarId) {
        if (!el.messages)
          el.messages = { displayed: [], history: '', historyTurbo: [] }
        el.messages.displayed = [message, ...el.messages.displayed]
        model = el.isAvatarUseModel3 ? EModel.davinci3 : EModel.davinci3turbo
      }
      return el
    })

    this._sortToFirst(avatarId)

    this._firebaseService.setMessage(avatarId, message, undefined, model)
    this._storageService.setUserAvatars(this.usersAvatars)
  }

  setHistoryToAvatar(
    avatarId: number,
    history: string | ChatCompletionRequestMessage[]
  ) {
    this.usersAvatars = this.usersAvatars.map((el) => {
      if (el.id === avatarId) {
        if (!el.messages)
          el.messages = { displayed: [], history: '', historyTurbo: [] }
        if (typeof history === 'string') {
          el.messages.history = history
        } else {
          el.messages.historyTurbo = history
        }
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
    const usingCustomAvatars = this.usersAvatars.filter(
      (el) => el.category === EAvatarsCategory.Custom
    )

    const [commonAvatars, startingAvatars, customAvatars] = await Promise.all([
      this._firebaseService.getCommonAvatars(),
      this._firebaseService.getStartingAvatars(),
      this._firebaseService.getCustomAvatars(usingCustomAvatars)
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

      if (customAvatars) {
        this.usersAvatars = this.usersAvatars.map((el) => {
          if (el.category === EAvatarsCategory.Custom) {
            const _avatar = customAvatars.find((_el) => _el.id === el.id)

            if (!_avatar) return { ...el, deleted: true }

            return merge({}, el, _avatar)
          }

          return el
        })
      }

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
          prompt: _avatar.prompt,
          turbo_init: _avatar.turbo_init
        }
      })
    )
  }

  //update all except custom
  @action.bound
  _mapUpdateUsersAvatarsFromFirebase() {
    const commonAvatarsList: AvatarModel[] = flatten(this.commonAvatars)
    const startingAvatarsList: AvatarModel[] = flatten(this.startingAvatars)

    this.usersAvatars = this.usersAvatars.map((avatar) => {
      if (avatar.category === EAvatarsCategory.Custom) {
        return avatar
      } else if (avatar.category === EAvatarsCategory.Starting) {
        const starting = startingAvatarsList.find((el) => el.id === avatar.id)

        if (starting) return merge({}, avatar, starting)
        return avatar
      } else {
        const common = commonAvatarsList.find((el) => el.id === avatar.id)

        if (common) return merge({}, avatar, common)
        return avatar
      }
    })
    this._storageService.setUserAvatars(this.usersAvatars)
  }

  async getSharedAvatar(avatarId: string, general: boolean, starting: boolean) {
    let avatar

    if (!general) {
      avatar = await this._firebaseService.getSharedAvatar(avatarId)
    } else if (starting) {
      avatar = flatten(this.startingAvatars).find(
        (el) => el.id.toString() === avatarId
      )
    } else {
      avatar = flatten(this.commonAvatars).find(
        (el) => el.id.toString() === avatarId
      )
    }

    if (avatar) {
      const avatarExist = this.usersAvatars.find((el) => el.id === avatar.id)
      if (avatarExist) {
        return avatarExist
      }

      this.usersAvatars.unshift(avatar)
      return avatar
    }

    return null
  }

  @action.bound
  removeCustomAvatar(avatarId: string | number) {
    this.usersAvatars = this.usersAvatars.filter((el) => el.id !== avatarId)
    this._storageService.setUserAvatars(this.usersAvatars)
  }

  @action.bound
  setStartingAvatars() {
    this.usersAvatars = [...this.usersAvatars, ...flatten(this.startingAvatars)]
    this._storageService.setUserAvatars(this.usersAvatars)
  }

  _handleRate() {
    const lastRate = this._storageService.getLastRate()
    const date1 = dayjs(lastRate || '')
    const date2 = dayjs()

    if (
      this._countMessages < 5 &&
      (!lastRate || date2.diff(date1, 'weeks') >= 2)
    ) {
      this._countMessages++
      if (this._countMessages === 5) {
        Rate.rate(RATE_CONFIG, (success) => {
          if (success) {
            this._storageService.setLastRate(dayjs().format('YYYY-MM-DD'))
            console.log('Successfully rated')
          }
        })
      }
    }
  }
}
