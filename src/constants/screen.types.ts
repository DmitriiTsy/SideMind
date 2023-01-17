export enum CommonScreenName {
  SelectAvatars = 'SelectAvatars',
  Boot = 'Boot',
  MainFeed = 'MainFeed',
  Chat = 'Chat'
}

export interface CommonScreenParamsMap {
  SelectAvatars: undefined
  Boot: undefined
  MainFeed: undefined
  Chat: undefined
}

export type ScreenName = keyof typeof CommonScreenName

interface ScreenParamsTypesMap extends CommonScreenParamsMap {}

export type ScreenParamTypes = { [K in ScreenName]: ScreenParamsTypesMap[K] }
