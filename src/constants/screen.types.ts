export enum CommonScreenName {
  Main = 'Main',
  Boot = 'Boot'
}

export interface CommonScreenParamsMap {
  Main: undefined
  Boot: undefined
}

export type ScreenName = keyof typeof CommonScreenName

interface ScreenParamsTypesMap extends CommonScreenParamsMap {}

export type ScreenParamTypes = { [K in ScreenName]: ScreenParamsTypesMap[K] }
