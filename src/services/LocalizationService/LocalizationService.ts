import { observable } from 'mobx'

import { Injectable } from 'IoC'
import {
  LocaleCode,
  Locales,
  Translation
} from 'services/LocalizationService/types'

import en from './locales/en/translation.json'

export const ILocalizationServiceVMTid = Symbol.for('ILocalizationServiceVMTid')

export interface ILocalizationServiceVM {
  readonly locales: Locales

  get<K extends keyof Translation>(key: K): Translation[K]
}

@Injectable()
export class LocalizationServiceVM implements ILocalizationServiceVM {
  readonly locales: Locales = {
    [LocaleCode.En]: {
      name: 'English',
      translation: en
    }
  }

  @observable private _localCode: LocaleCode = LocaleCode.En

  get t() {
    return this.locales[this._localCode]?.translation
  }

  get = (key: keyof Translation) => {
    return this.t[key]
  }
}
