import { MMKVLoader, MMKVInstance } from 'react-native-mmkv-storage'

import { observable } from 'mobx'

import { Injectable } from 'IoC'

export const IStorageServiceTid = Symbol.for('IStorageServiceTid')
export interface IStorageService {
  storage: MMKVInstance
  setUserLogin: () => void
  getUserLogin: () => boolean
  setUserAvatars: () => void
  getUserAvatars: () => void
}

type User = {
  id: string
  avatars: Array<string>
  messages: Array<string>
}

@Injectable()
export class StorageService implements IStorageService {
  constructor() {
    this.storage = new MMKVLoader().initialize()
  }
  @observable storage: MMKVInstance

  private _storage: string
  private _key: string

  setUserLogin() {
    this.storage.setBool('userLogin', true)
  }

  getUserLogin() {
    return this.storage.getBool('userLogin')
  }

  setUserAvatars() {
    this.storage.setArray('Array', ['1'])
  }

  getUserAvatars() {
    this.storage.getArray('Array', [])
  }
}
