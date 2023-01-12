import { MMKVLoader, MMKVInstance } from 'react-native-mmkv-storage'

import { observable } from 'mobx'

import { Injectable } from 'IoC'

export const IStorageServiceTid = Symbol.for('IStorageServiceTid')
// export const useStorage = create(storage)
export interface IStorageService {
  storage: MMKVInstance
  setUserLogin: () => void
  getUserLogin: () => boolean
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
}
