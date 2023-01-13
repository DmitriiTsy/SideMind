export interface IFirebaseResponseUsers {
  message?: string[]
}

export interface BotModel {
  name: string
  tagLine: string
  imagePath: string
  category: string
  id: number
  prompt: string
  params: object
  temperature: number
  frequency_penalty: number
  max_tokens: number
  presence_penalty: number
  top_p: number
}

export interface IFirebaseResponseBots {
  [key: string]: BotModel[]
}
