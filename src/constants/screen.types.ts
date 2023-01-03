export enum CommonScreenName {
  Home = 'Home',
  Boot = 'Boot'
}

export interface CommonScreenParamsMap {
  Home: undefined
  Boot: undefined
}

export type ScreenName = keyof typeof CommonScreenName

interface ScreenParamsTypesMap extends CommonScreenParamsMap {}

export type ScreenParamTypes = { [K in ScreenName]: ScreenParamsTypesMap[K] }
