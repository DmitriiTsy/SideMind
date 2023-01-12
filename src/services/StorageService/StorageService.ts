import { MMKVLoader, create, useMMKVStorage } from 'react-native-mmkv-storage'

import { LiteralUnion } from 'prettier'

import { Injectable } from 'IoC'


export const storage = new MMKVLoader().initialize()
export const useStorage = create(storage)
export interface IStorageService {
  storage: void
}

@Injectable()
export class StorageService implements IStorageService {
  storage: void

  private _storage: string
  private _key: string

  useStorage = (
    key: LiteralUnion<'user' | 'password'>,
    defaultValue?: string
  ) => {
    const [value, setValue] = useMMKVStorage(key, storage, defaultValue)
    return [value, setValue]
  }
}
