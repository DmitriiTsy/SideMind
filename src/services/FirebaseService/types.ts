export interface IFirebaseResponse {
  message?: string[]
}

export interface BotModel {
  name: string
  tagLine: string
  imagePath: string
  category: string
}

export interface IFirebaseResponseBots {
  [key: string]: BotModel[]
}
