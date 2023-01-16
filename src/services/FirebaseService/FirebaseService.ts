import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import analytics from '@react-native-firebase/analytics'
import uuid from 'react-native-uuid'

import { action, observable } from 'mobx'

import { Inject, Injectable } from 'IoC'

import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'
import {
  BotModel,
  IFirebaseResponseBots,
  IFirebaseResponseUsers
} from 'services/FirebaseService/types'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { ESender } from 'components/Chat/types'

export const IFirebaseServiceTid = Symbol.for('IFirebaseServiceTid')

export interface IFirebaseService {
  pendingBots: boolean

  init(): Promise<void>

  setBots(): void

  addBot(botId: number): void

  setMessage(
    botId: number,
    type: ESender,
    text: string,
    isError?: boolean
  ): void
}

@Injectable()
export class FirebaseService implements IFirebaseService {
  private _usersCollection: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseUsers>
  private _botsCollection: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseBots>

  @observable pendingBots = false

  constructor(
    @Inject(ISystemInfoServiceTid)
    private _systemInfoService: ISystemInfoService,
    @Inject(IAppStoreTid) private _appStore: IAppStore
  ) {
    this._usersCollection = firestore().collection('usersList')
    this._botsCollection = firestore().collection('botsList')
  }

  async init() {
    await this._systemInfoService.init()

    try {
      await Promise.all([
        this.getBotsList(),
        this.checkExistUser(),
        this.getStartingBotsList()
      ])
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

  @action.bound
  async getBotsList() {
    this.pendingBots = true
    const data = (await this._botsCollection.doc('bots').get()).data()
    const botsList = await this.mapBots(data)
    this._appStore.setAvailableBots(botsList)
    this.pendingBots = false
  }

  async getStartingBotsList() {
    const data = (await this._botsCollection.doc('Starting').get()).data()
    const botsList = await this.mapBots(data)
    this._appStore.setStartingBots(botsList)
  }

  async mapBots(data: IFirebaseResponseBots) {
    const botsList: BotModel[][] = []
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
    messageId: string | number,
    botId: number,
    type: ESender,
    isError: boolean
  ) {
    await analytics().logEvent(
      isError
        ? 'Error_OpenAI'
        : type === ESender.BOT
        ? 'MessageReceived'
        : 'MessageSend',
      { messageId, deviceId: this._systemInfoService.deviceId, botId }
    )
  }

  async setMessage(
    botId: number,
    type: ESender,
    text: string,
    isError?: boolean
  ) {
    const id = uuid.v4(type) + `--${type}`
    await Promise.all([
      this._usersCollection.doc(this._systemInfoService.deviceId).update({
        [botId]: firestore.FieldValue.arrayUnion({
          type,
          text,
          messageId: id
        })
      }),
      this.logMessage(id, botId, type, isError)
    ])
  }

  async setBots() {
    const formatted = {}

    this._appStore.usedBots.map((el) => (formatted[el.id] = []))

    await this._usersCollection
      .doc(this._systemInfoService.deviceId)
      .set(formatted)
  }

  async addBot(botId: number) {
    await this._usersCollection
      .doc(this._systemInfoService.deviceId)
      .update({ [botId]: [] })
  }
}
