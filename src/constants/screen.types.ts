export enum CommonScreenName {
  SelectAvatars = 'SelectAvatars',
  Boot = 'Boot',
  MainFeed = 'MainFeed',
  Chat = 'Chat',
  Menu = 'Menu',
  Drawer = 'Drawer'
}

export interface CommonScreenParamsMap {
  SelectAvatars: undefined
  Boot: undefined
  MainFeed: undefined
  Menu: undefined
  Drawer: undefined
  Chat: undefined | { bID: string; general: boolean; starting: boolean }
}

export type ScreenName = keyof typeof CommonScreenName

interface ScreenParamsTypesMap extends CommonScreenParamsMap {}

export type ScreenParamTypes = { [K in ScreenName]: ScreenParamsTypesMap[K] }
