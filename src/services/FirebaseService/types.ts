import { ESender, IMessage } from 'components/Chat/types'

export interface IFirebaseResponseUsers {
  message?: string[]
}

export const LOG_TYPE = {
  [ESender.BOT]: 'MessageReceived',
  [ESender.HUMAN]: 'MessageSent',
  [ESender.RESET]: 'Reset'
}

export interface AvatarModel {
  name: string
  tagLine: string
  imagePath: string
  category: string
  id: number | string | number[]
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
  [key: string]: AvatarModel[]
}
