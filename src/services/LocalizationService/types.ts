import en from './locales/en/translation.json'

export enum LocaleCode {
  En = 'en'
}

export type Translation = typeof en

export type Locales = {
  [c in LocaleCode]: {
    name: string
    translation: Translation
  }
}
