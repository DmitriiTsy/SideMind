import { MMKVLoader, MMKVInstance } from 'react-native-mmkv-storage'

import { observable } from 'mobx'

import { Injectable } from 'IoC'
import { BotModel } from 'services/FirebaseService/types'

export const IStorageServiceTid = Symbol.for('IStorageServiceTid')

export interface IStorageService {
  storage: MMKVInstance
  setUserLogin(): void
  getUserLogin(): boolean
  setUserAvatars(avatars: BotModel[]): void
  getUserAvatars(): BotModel[] | null
}

@Injectable()
export class StorageService implements IStorageService {
  @observable storage: MMKVInstance

  constructor() {
    this.storage = new MMKVLoader().initialize()
  }

  setUserLogin() {
    this.storage.setBool('userLogin', true)
  }

  getUserLogin() {
    return this.storage.getBool('userLogin')
  }

  setUserAvatars(avatars) {
    this.storage.setArray('Avatars', avatars)
  }

  getUserAvatars() {
    return this.storage.getArray<BotModel>('Avatars', (error, value) => {
      if (!error) return value
      return null
    })
  }
}
