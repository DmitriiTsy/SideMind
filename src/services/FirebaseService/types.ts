export interface IFirebaseResponseUsers {
  message?: string[]
}

export interface BotModel {
  name: string
  tagLine: string
  imagePath: string
  category: string
  id: number
}

export interface IFirebaseResponseBots {
  [key: string]: BotModel[]
}
