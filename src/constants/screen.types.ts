export enum CommonScreenName {
  SelectBots = 'SelectBots',
  Boot = 'Boot',
  Chat = 'Chat'
}

export interface CommonScreenParamsMap {
  SelectBots: undefined
  Boot: undefined
  Chat: undefined
}

export type ScreenName = keyof typeof CommonScreenName

interface ScreenParamsTypesMap extends CommonScreenParamsMap {}

export type ScreenParamTypes = { [K in ScreenName]: ScreenParamsTypesMap[K] }
