import messaging from '@react-native-firebase/messaging'

import { Inject, Injectable } from 'IoC'
import { IStorageService, IStorageServiceTid } from 'services/StorageService'

export const IPushNotificationsServiceTid = Symbol.for(
  'IPushNotificationsServiceTid'
)

export interface IPushNotificationsService {
  init(): Promise<void>
}

@Injectable()
export class PushNotificationsService implements IPushNotificationsService {
  constructor(
    @Inject(IStorageServiceTid) private _storageService: IStorageService
  ) {}

  async init() {
    const authorizationStatus = await messaging().requestPermission()

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus)
    }

    if (
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      this._handlers()
    }
  }

  async _handlers() {
    if (!this._storageService.getFCMToken()) {
      // await messaging().registerDeviceForRemoteMessages()
      const token = await messaging().getToken()
      this._storageService.setFCMToken(token)
      console.log(token)
    }
    console.log(this._storageService.getFCMToken())

    messaging().onMessage(() => {
      console.log('foregroundMessages')
    })
    messaging().setBackgroundMessageHandler((message) => {
      console.log('backgroundMessages', message)
      return new Promise((resolve) => resolve)
    })
  }
}
