export enum CommonScreenName {
  SelectBots = 'SelectBots',
  Boot = 'Boot',
  MainFeed = 'MainFeed',
  Chat = 'Chat',
  Loading = 'Loading'
}

export interface CommonScreenParamsMap {
  SelectBots: undefined
  Boot: undefined
  MainFeed: undefined
  Chat: undefined
  Loading: undefined
}

export type ScreenName = keyof typeof CommonScreenName

interface ScreenParamsTypesMap extends CommonScreenParamsMap {}

export type ScreenParamTypes = { [K in ScreenName]: ScreenParamsTypesMap[K] }
