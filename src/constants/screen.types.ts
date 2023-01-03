export enum CommonScreenName {
  SelectSideMinds = 'SelectSideMinds',
  Boot = 'Boot'
}

export interface CommonScreenParamsMap {
  SelectSideMinds: undefined
  Boot: undefined
}

export type ScreenName = keyof typeof CommonScreenName

interface ScreenParamsTypesMap extends CommonScreenParamsMap {}

export type ScreenParamTypes = { [K in ScreenName]: ScreenParamsTypesMap[K] }
