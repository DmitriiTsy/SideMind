export enum CommonScreenName {
  SelectBots = 'SelectBots',
  Boot = 'Boot'
}

export interface CommonScreenParamsMap {
  SelectBots: undefined
  Boot: undefined
}

export type ScreenName = keyof typeof CommonScreenName

interface ScreenParamsTypesMap extends CommonScreenParamsMap {}

export type ScreenParamTypes = { [K in ScreenName]: ScreenParamsTypesMap[K] }
