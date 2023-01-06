import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { observable, runInAction } from 'mobx'

import { Inject, Injectable } from 'IoC'

import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'
import {
  BotModel,
  IFirebaseResponse,
  IFirebaseResponseBots
} from 'services/FirebaseService/types'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'

export const IFirebaseServiceTid = Symbol.for('IFirebaseServiceTid')

export interface IFirebaseService {
  botsList: BotModel[][]
  init(): Promise<void>
}

@Injectable()
export class FirebaseService implements IFirebaseService {
  private _users: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponse>
  private _bots: FirebaseFirestoreTypes.CollectionReference<IFirebaseResponseBots>

  @observable botsList: BotModel[][] = []

  constructor(
    @Inject(ISystemInfoServiceTid)
    private _systemInfoService: ISystemInfoService,
    @Inject(IOpenAIServiceTid) private _openAIService: IOpenAIService
  ) {
    this._users = firestore().collection('usersList')
    this._bots = firestore().collection('botsList')
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
    const { exists } = await this._users
      .doc(this._systemInfoService.deviceId)
      .get()
    !exists && (await this._users.doc(this._systemInfoService.deviceId).set({}))
  }

  async getBotsList() {
    const data = (await this._bots.doc('bots').get()).data()
    const array: BotModel[][] = []
    for (const el of Object.entries(data)) {
      for (const _el of Object.values(el[1])) {
        _el.imagePath = await storage().ref(_el.imagePath).getDownloadURL()
      }
      array.push(el[1])
    }
    runInAction(() => (this.botsList = array))
  }
}
