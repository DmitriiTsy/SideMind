export interface IFirebaseResponseUsers {
  message?: string[]
}

export interface BotModel {
  map(arg0: (bot: any) => number): any
  name: string
  tagLine: string
  imagePath: string
  category: string
  id: number
  prompt: string
}

export interface IFirebaseResponseBots {
  [key: string]: BotModel[]
}
