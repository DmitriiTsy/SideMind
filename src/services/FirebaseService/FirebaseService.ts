import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import analytics from '@react-native-firebase/analytics'
import uuid from 'react-native-uuid'

import { Image } from 'react-native'

import { Inject, Injectable } from 'IoC'

import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'
import {
  AvatarModel,
  IFirebaseResponseBots,
  IFirebaseResponseUsers,
  LOG_TYPE
} from 'services/FirebaseService/types'
import { IMessage } from 'components/Chat/types'

export const IFirebaseServiceTid = Symbol.for('IFirebaseServiceTid')

export interface IFirebaseService {
  init(): Promise<void>

  getCommonAvatars(cache?: boolean): Promise<AvatarModel[][]>

  getStartingAvatars(cache?: boolean): Promise<AvatarModel[][]>

  setAvatars(avatars: AvatarModel[]): void

  updateAvatars(avatarId: number): void

  setMessage(avatarId: number, message: IMessage, isError?: boolean): void
}

@Injectable()
export class FirebaseService implements IFirebaseService {
  private _usersCollection: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseUsers>
  private _avatarsCollection: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseBots>

  constructor(
    @Inject(ISystemInfoServiceTid)
    private _systemInfoService: ISystemInfoService
  ) {
    this._usersCollection = firestore().collection('usersList')
    this._avatarsCollection = firestore().collection('botsList')
  }

  async init() {
    await this._systemInfoService.init()

    try {
      await this.checkExistUser()
    } catch (e) {
      console.log('FirebaseService error:', e)
    }
  }

  async checkExistUser() {
    const { exists } = await this._usersCollection
      .doc(this._systemInfoService.deviceId)
      .get()
    if (!exists) {
      await Promise.all([
        this._usersCollection.doc(this._systemInfoService.deviceId).set({}),
        this.logFirstOpen()
      ])
    }
  }

  async getCommonAvatars(cache?: boolean) {
    const data = (await this._avatarsCollection.doc('Common').get()).data()
    return this.mapAvatars(data, cache)
  }

  async getStartingAvatars(cache?: boolean) {
    const data = (await this._avatarsCollection.doc('Starting').get()).data()
    return this.mapAvatars(data, cache)
  }

  async mapAvatars(data: IFirebaseResponseBots, cache?: boolean) {
    const botsList: AvatarModel[][] = []
    const prefetchImages = []

    for (const el of Object.entries(data)) {
      if (cache) {
        const cb = (url: string) => prefetchImages.push(Image.prefetch(url))

        botsList.push(await this.cacheImages(el, cb))
      } else {
        botsList.push(el[1])
      }
    }

    await Promise.all(prefetchImages)

    return botsList
  }

  async cacheImages(
    avatars: [string, AvatarModel[]],
    prefetchCb: (url: string) => void
  ) {
    for (const avatar of Object.values(avatars[1])) {
      avatar.imagePath = await storage().ref(avatar.imagePath).getDownloadURL()
      prefetchCb(avatar.imagePath)
    }
    return avatars[1]
  }

  async logFirstOpen() {
    await analytics().logEvent('FirstOpen', {
      deviceId: this._systemInfoService.deviceId
    })
  }

  async logMessage(
    messageId: string,
    botId: number,
    message: IMessage,
    isError: boolean
  ) {
    const _typeLog = isError ? 'Error_OpenAI' : LOG_TYPE[message.sender]
    await analytics().logEvent(_typeLog, {
      messageId,
      deviceId: this._systemInfoService.deviceId,
      botId,
      date: `${message.date}`
    })
  }

  async setMessage(avatarId: number, message: IMessage, isError?: boolean) {
    const id = uuid.v4() + `--${message.sender}`
    await Promise.all([
      this._usersCollection.doc(this._systemInfoService.deviceId).update({
        [avatarId]: firestore.FieldValue.arrayUnion({
          type: message.sender,
          text: message.text,
          messageId: id,
          date: new Date()
        })
      }),
      this.logMessage(id, avatarId, message, isError)
    ])
  }

  async setAvatars(avatars: AvatarModel[]) {
    const formatted = {}

    avatars.map((el) => (formatted[el.id] = []))

    await this._usersCollection
      .doc(this._systemInfoService.deviceId)
      .set(formatted)
  }

  async updateAvatars(avatarId: number) {
    await this._usersCollection
      .doc(this._systemInfoService.deviceId)
      .update({ [avatarId]: [] })
  }
}
