import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { Inject, Injectable } from 'IoC'

import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'
import {
  BotModel,
  IFirebaseResponseUsers,
  IFirebaseResponseBots
} from 'services/FirebaseService/types'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'
import { IAppStore, IAppStoreTid } from 'store/AppStore'

export const IFirebaseServiceTid = Symbol.for('IFirebaseServiceTid')

export interface IFirebaseService {
  init(): Promise<void>
}

@Injectable()
export class FirebaseService implements IFirebaseService {
  private _usersCollection: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseUsers>
  private _botsCollection: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseBots>

  constructor(
    @Inject(ISystemInfoServiceTid)
    private _systemInfoService: ISystemInfoService,
    @Inject(IOpenAIServiceTid) private _openAIService: IOpenAIService,
    @Inject(IAppStoreTid) private _appStore: IAppStore
  ) {
    this._usersCollection = firestore().collection('usersList')
    this._botsCollection = firestore().collection('botsList')
  }

  async init() {
    await this._systemInfoService.init()
    this._openAIService.init()

    try {
      await this.getBotsList()
      await this.checkExistUser()
    } catch (e) {
      console.log('FirebaseService error:', e)
    }
  }

  async checkExistUser() {
    const { exists } = await this._usersCollection
      .doc(this._systemInfoService.deviceId)
      .get()
    !exists &&
      (await this._usersCollection
        .doc(this._systemInfoService.deviceId)
        .set({}))
  }

  async getBotsList() {
    const data = (await this._botsCollection.doc('bots').get()).data()
    const botsList: BotModel[][] = []
    for (const el of Object.entries(data)) {
      for (const _el of Object.values(el[1])) {
        _el.imagePath = await storage().ref(_el.imagePath).getDownloadURL()
      }
      botsList.push(el[1])
    }
    this._appStore.setAvailableBots(botsList)
  }
}
