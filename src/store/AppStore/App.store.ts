import { action, observable, runInAction } from 'mobx'

import { flatten } from 'lodash'

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
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'
import { RATE_CONFIG } from 'constants/rateConfig'

import { Avatar, IAvatar } from '../../classes/Avatar'
import { EModel } from '../../classes/OpenAi'

export const IAppStoreTid = Symbol.for('IAppStoreTid')

export interface IAppStore {
  usersAvatars: IAvatar[]

  startingAvatars: AvatarModel[][]
  commonAvatars: AvatarModel[][]

  init(): Promise<void>

  setUsersAvatars(avatar: AvatarModel): void

  updateUsersAvatars(avatar: AvatarModel): IAvatar
  updateUsersAvatars(
    avatar: AvatarModel,
    imagePath: string,
    localPath: string
  ): AvatarModel | null

  editCustomAvatar(editedAvatar: AvatarModel, localPath?: string): Promise<void>

  setAvatarsFromStorage(): void

  updateAvatarsFromFirebase(): void

  getSharedAvatar(
    avatarId: string,
    general: boolean,
    starting: boolean
  ): Promise<IAvatar | null>

  removeCustomAvatar(avatarId: string | number): void

  setStartingAvatars(): void
}

@Injectable()
export class AppStore implements IAppStore {
  @observable usersAvatars: IAvatar[] = []

  @observable startingAvatars: AvatarModel[][] = []
  @observable commonAvatars: AvatarModel[][] = []

  private _countMessages = 0

  constructor(
    @Inject(IStorageServiceTid)
    private readonly _storageService: IStorageService,
    @Inject(IFirebaseServiceTid)
    private readonly _firebaseService: IFirebaseService,
    @Inject(ISystemInfoServiceTid)
    private readonly _systemInfoService: ISystemInfoService,
    @Inject(IOpenAIServiceTid) private readonly _openAiService: IOpenAIService
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

    const _avatars: IAvatar[] = [this._createAvatarInstance(avatar)]
    this.startingAvatars.map((bots) =>
      bots.map((bot) => _avatars.unshift(this._createAvatarInstance(bot)))
    )
    this.usersAvatars = _avatars

    this._storageService.setUserAvatars(this.usersAvatars)
    this._firebaseService.setAvatars(this.usersAvatars.map((el) => el.data))
  }

  async updateUsersAvatars(avatar: AvatarModel)
  async updateUsersAvatars(
    avatar: AvatarModel,
    imagePath?: string,
    localPath?: string
  ) {
    const _avatar = this.usersAvatars.find((el) => el.data.id === avatar.id)
    if (!_avatar) {
      if (typeof imagePath === 'string' && typeof localPath === 'string') {
        avatar.uri = await this._firebaseService.createCustomAvatar(
          avatar,
          imagePath,
          localPath
        )
      }

      runInAction(() => {
        this.usersAvatars.unshift(this._createAvatarInstance(avatar))
        this._storageService.setUserAvatars(this.usersAvatars)
        this._firebaseService.updateAvatars(avatar.id)
      })

      return this.usersAvatars.find((el) => el.data.id === avatar.id)
    }
    return _avatar
  }

  @action.bound
  async editCustomAvatar(
    editedAvatar: AvatarModel,
    localPath?: string
  ): Promise<void> {
    const _avatar = this.usersAvatars.find(
      (el) => el.data.id === editedAvatar.id
    )

    const oldAvatar: AvatarModel = {
      name: _avatar.data.name,
      tagLine: _avatar.data.tagLine,
      imagePath: _avatar.data.imagePath,
      category: _avatar.data.category,
      id: _avatar.data.id,
      prompt: _avatar.data.prompt,
      params: _avatar.data.params,
      bio: _avatar.data.bio
    }

    const uri = await this._firebaseService.editCustomAvatar(
      oldAvatar,
      editedAvatar,
      localPath
    )

    runInAction(() => {
      this.usersAvatars = this.usersAvatars.map((el) => {
        if (el.data.id === editedAvatar.id) {
          el.updateAvatarData({ ...editedAvatar, uri: uri ? uri : el.data.uri })
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
      return this._createAvatarInstance(el)
    })

    //additional field in avatars obj for supporting chat with old model open ai
    //release v1.3.4
    if (!this._storageService.getAddedFieldsForOldAvatars()) {
      this.usersAvatars = this.usersAvatars.map((el) => {
        if (el.data.messages?.displayed?.length > 0) {
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
        if (el.data.category === EAvatarsCategory.Custom) {
          _customAvatars.push(el.data)
        }
      })
      setTimeout(() => {
        this._firebaseService.moveCustomAvatarsToNewList(_customAvatars)
        this._storageService.setCustomAvatarsInCustomList()
      }, 100)
    }
  }

  private _updateStore(
    message: IMessage,
    avatarID: string | number,
    model: EModel
  ) {
    try {
      message.sender === ESender.HUMAN && this._handleRate()
      this._sortToFirst(avatarID)
      this._storageService.setUserAvatars(this.usersAvatars)
      this._firebaseService.setMessage(avatarID, message, undefined, model)
    } catch (e) {
      console.log(e)
    }
  }

  private _sortToFirst(avatarId: string | number) {
    const index = this.usersAvatars.findIndex((el) => el.data.id === avatarId)
    const _avatar = this.usersAvatars[index]
    runInAction(() => {
      this.usersAvatars.splice(index, 1)
      this.usersAvatars.unshift(_avatar)
    })
  }

  async updateAvatarsFromFirebase() {
    const usingCustomAvatars = this.usersAvatars
      .filter((el) => el.data.category === EAvatarsCategory.Custom)
      .map((el) => el.data)

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
          if (el.data.category === EAvatarsCategory.Custom) {
            const _avatar = customAvatars.find((_el) => _el.id === el.data.id)

            if (!_avatar) {
              el.updateAvatarData({ deleted: true })
            } else {
              el.updateAvatarData(_avatar)
            }
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

  //update default users avatars
  @action.bound
  _mapUpdateUsersAvatarsFromFirebase() {
    const commonAvatarsList: AvatarModel[] = flatten(this.commonAvatars)
    const startingAvatarsList: AvatarModel[] = flatten(this.startingAvatars)

    this.usersAvatars = this.usersAvatars.map((avatar) => {
      if (avatar.data.category === EAvatarsCategory.Custom) {
        return avatar
      } else if (avatar.data.category === EAvatarsCategory.Starting) {
        const starting = startingAvatarsList.find(
          (el) => el.id === avatar.data.id
        )

        if (starting) avatar.updateAvatarData(starting)
        return avatar
      } else {
        const common = commonAvatarsList.find((el) => el.id === avatar.data.id)

        if (common) avatar.updateAvatarData(common)
        return avatar
      }
    })
    this._storageService.setUserAvatars(this.usersAvatars)
  }

  async getSharedAvatar(avatarId: string, general: boolean, starting: boolean) {
    let avatar: AvatarModel

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
      const avatarExist = this.usersAvatars.find(
        (el) => el.data.id === avatar.id
      )
      if (avatarExist) {
        return avatarExist
      }

      this.usersAvatars.unshift(this._createAvatarInstance(avatar))
      return this.usersAvatars.find((el) => el.data.id === avatar.id)
    }

    return null
  }

  @action.bound
  removeCustomAvatar(avatarId: string | number) {
    this.usersAvatars = this.usersAvatars.filter(
      (el) => el.data.id !== avatarId
    )
    this._storageService.setUserAvatars(this.usersAvatars)
  }

  @action.bound
  setStartingAvatars() {
    this.usersAvatars = [
      ...this.usersAvatars,
      ...flatten(this.startingAvatars).map((el) =>
        this._createAvatarInstance(el)
      )
    ]
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
        Rate.rate(
          { ...RATE_CONFIG, openAppStoreIfInAppFails: false },
          (success) => {
            if (success) {
              this._storageService.setLastRate(dayjs().format('YYYY-MM-DD'))
              console.log('Successfully rated')
            }
          }
        )
      }
    }
  }

  _createAvatarInstance(data: AvatarModel) {
    return new Avatar({
      data,
      updateStore: (
        message: IMessage,
        avatarID: string | number,
        model: EModel
      ) => {
        this._updateStore(message, avatarID, model)
      },
      loadFBData: () => {
        this.updateAvatarsFromFirebase()
      }
    })
  }
}
