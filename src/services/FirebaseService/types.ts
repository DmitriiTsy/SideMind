import { IMessage } from 'components/Chat/types'

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
  params: {
    temperature: number
    frequency_penalty: number
    max_tokens: number
    presence_penalty: number
    top_p: number
  }
  messages?: {
    displayed?: IMessage[]
    history?: string
  }
}

export interface IFirebaseResponseBots {
  [key: string]: BotModel[]
}
