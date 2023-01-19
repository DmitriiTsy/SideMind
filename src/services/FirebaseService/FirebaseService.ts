import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import analytics from '@react-native-firebase/analytics'
import uuid from 'react-native-uuid'

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

  getCommonAvatars(): Promise<AvatarModel[][]>

  getStartingAvatars(): Promise<AvatarModel[][]>

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

  async getCommonAvatars() {
    const data = (await this._avatarsCollection.doc('Common').get()).data()
    return this.mapAvatars(data)
  }

  async getStartingAvatars() {
    const data = (await this._avatarsCollection.doc('Starting').get()).data()
    return this.mapAvatars(data)
  }

  async mapAvatars(data: IFirebaseResponseBots) {
    const botsList: AvatarModel[][] = []
    for (const el of Object.entries(data)) {
      for (const _el of Object.values(el[1])) {
        _el.imagePath = await storage().ref(_el.imagePath).getDownloadURL()
      }
      botsList.push(el[1])
    }

    return botsList
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
