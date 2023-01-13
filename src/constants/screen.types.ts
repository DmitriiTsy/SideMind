export enum CommonScreenName {
  SelectBots = 'SelectBots',
  Boot = 'Boot',
  MainFeed = 'MainFeed',
  Chat = 'Chat'
}

export interface CommonScreenParamsMap {
  SelectBots: { isStarting: boolean }
  Boot: undefined
  MainFeed: undefined
  Chat: undefined
}

export type ScreenName = keyof typeof CommonScreenName

interface ScreenParamsTypesMap extends CommonScreenParamsMap {}

export type ScreenParamTypes = { [K in ScreenName]: ScreenParamsTypesMap[K] }
