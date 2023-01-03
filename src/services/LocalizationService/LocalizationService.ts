import { observable } from 'mobx'

import { Injectable } from 'IoC'
import {
  LocaleCode,
  Locales,
  Translation
} from 'services/LocalizationService/types'

import en from './locales/en/translation.json'

export const ILocalizationServiceTid = Symbol.for('ILocalizationServiceTid')

export interface ILocalizationService {
  readonly locales: Locales

  get<K extends keyof Translation>(key: K): Translation[K]
}

@Injectable()
export class LocalizationService implements ILocalizationService {
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
