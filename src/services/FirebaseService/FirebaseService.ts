import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import analytics from '@react-native-firebase/analytics'
import auth from '@react-native-firebase/auth'
import uuid from 'react-native-uuid'

import RNFastImage from 'react-native-fast-image'

import { Inject, Injectable } from 'IoC'

import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'
import {
  AvatarModel,
  IFirebaseResponseBots,
  IFirebaseResponseMasterPrompt,
  IFirebaseResponseUsers,
  LOG_TYPE
} from 'services/FirebaseService/types'
import { IMessage } from 'components/Chat/types'

export const IFirebaseServiceTid = Symbol.for('IFirebaseServiceTid')

export interface IFirebaseService {
  init(): Promise<void>

  getCommonAvatars(cache?: boolean): Promise<AvatarModel[][]>

  getStartingAvatars(cache?: boolean): Promise<AvatarModel[][]>

  getCustomAvatars(): Promise<AvatarModel[] | null>

  setAvatars(avatars: AvatarModel[]): void

  updateAvatars(avatarId: number | string): void

  setMessage(
    avatarId: number | string,
    message: IMessage,
    isError?: boolean
  ): void

  getMasterPrompt(): Promise<IFirebaseResponseMasterPrompt>

  createCustomAvatar(
    avatar: AvatarModel,
    imagePath: string,
    localPath: string
  ): Promise<string>

  editCustomAvatar(
    oldAvatar: AvatarModel,
    editedAvatar: AvatarModel,
    localPath?: string
  ): Promise<string>

  getSharedAvatar(
    deviceId: string,
    avatarId: string
  ): Promise<AvatarModel | null>
}

@Injectable()
export class FirebaseService implements IFirebaseService {
  private _usersCollection: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseUsers>
  private _avatarsCollection: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseBots>
  private _masterPrompt: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseMasterPrompt>

  constructor(
    @Inject(ISystemInfoServiceTid)
    private _systemInfoService: ISystemInfoService
  ) {
    this._usersCollection = firestore().collection('usersList')
    this._avatarsCollection = firestore().collection('botsList')
    this._masterPrompt = firestore().collection('prompts')
  }

  async init() {
    await auth().signInAnonymously()
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
    const data = (await this._avatarsCollection.doc('Common_v2').get()).data()
    return this.mapAvatars(data, cache)
  }

  async getStartingAvatars(cache?: boolean) {
    const data = (await this._avatarsCollection.doc('Starting_v2').get()).data()
    return this.mapAvatars(data, cache)
  }

  async getCustomAvatars() {
    const data = (await this._avatarsCollection.doc('Custom').get()).data()

    for (const el of Object.keys(data)) {
      if (el === this._systemInfoService.deviceId) {
        return data[this._systemInfoService.deviceId]
      }
    }

    return null
  }

  async getMasterPrompt() {
    return (await this._masterPrompt.doc('master').get()).data()
  }

  async mapAvatars(data: IFirebaseResponseBots, cache?: boolean) {
    const botsList: AvatarModel[][] = []

    for (const el of Object.entries(data)) {
      if (cache) {
        // botsList.push(await this.cacheImages(el))
        const avatars = []
        for (const avatar of Object.values(el[1])) {
          avatar.uri = avatar.imagePath
          RNFastImage.preload([{ uri: avatar.uri }])
          avatars.push(avatar)
        }
        botsList.push(avatars)
      } else {
        botsList.push(el[1])
      }
    }

    return botsList
  }

  async cacheImages(avatars: [string, AvatarModel[]]) {
    for (const avatar of Object.values(avatars[1])) {
      avatar.uri = await storage().ref(avatar.imagePath).getDownloadURL()
      RNFastImage.preload([{ uri: avatar.uri }])
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
    botId: number | string,
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

  async setMessage(
    avatarId: number | string,
    message: IMessage,
    isError?: boolean
  ) {
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

  async updateAvatars(avatarId: number | string) {
    await this._usersCollection
      .doc(this._systemInfoService.deviceId)
      .update({ [avatarId]: [] })
  }

  async createCustomAvatar(
    avatar: AvatarModel,
    imagePath: string,
    localPath: string
  ) {
    try {
      if (localPath) {
        await this._uploadFile(imagePath, localPath)

        imagePath = await storage().ref(imagePath).getDownloadURL()
        RNFastImage.preload([{ uri: imagePath }])
      }

      await Promise.all([
        await this._avatarsCollection.doc('Custom').update({
          [this._systemInfoService.deviceId]:
            firestore.FieldValue.arrayUnion(avatar)
        })
      ])

      return imagePath
    } catch (e) {
      console.log('create custom Avatar', e)
      return ''
    }
  }

  async editCustomAvatar(
    oldAvatar: AvatarModel,
    editedAvatar: AvatarModel,
    localPath?: string
  ) {
    const docCustom = this._avatarsCollection.doc('Custom')
    const { deviceId } = this._systemInfoService

    await Promise.all([
      docCustom.update({
        [deviceId]: firestore.FieldValue.arrayRemove(oldAvatar)
      }),
      docCustom.update({
        [deviceId]: firestore.FieldValue.arrayUnion(editedAvatar)
      })
    ])

    if (localPath) {
      await this._uploadFile(editedAvatar.imagePath, localPath)

      const uri = await storage().ref(editedAvatar.imagePath).getDownloadURL()
      RNFastImage.preload([{ uri }])

      return uri
    }

    return ''
  }

  _uploadFile(imagePath: string, localPath: string) {
    try {
      const ref = storage().ref(imagePath)

      const task = ref.putFile(localPath)

      return task.then((e) => {
        return !(e.state === 'error' || e.state === 'cancelled')
      })
    } catch (e) {
      console.log('uploadFile', e)
      return false
    }
  }

  async getSharedAvatar(deviceId: string, avatarId: string) {
    const data = (await this._avatarsCollection.doc('Custom').get()).data()

    for (const el of Object.keys(data)) {
      if (el === deviceId) {
        const avatar = data[deviceId].find((el) => el.id === avatarId)

        if (avatar.imagePath) {
          avatar.uri = await storage().ref(avatar.imagePath).getDownloadURL()

          RNFastImage.preload([{ uri: avatar.uri }])
        }

        return avatar
      }
    }

    return null
  }
}
