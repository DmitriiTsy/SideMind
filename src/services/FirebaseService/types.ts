import { ESender, IMessage } from 'components/Chat/types'

export interface IFirebaseResponseUsers {
  message?: string[]
}

export const LOG_TYPE = {
  [ESender.BOT]: 'MessageReceived',
  [ESender.HUMAN]: 'MessageSent',
  [ESender.RESET]: 'Reset'
}

export enum EAvatarsCategory {
  Starting = 'Starting',
  Common = 'Common',
  Custom = 'Custom'
}

export interface AvatarModel {
  name: string
  tagLine: string
  imagePath: string
  uri?: string
  category: EAvatarsCategory
  id: number | string
  prompt: string
  params: {
    temperature: number
    frequency_penalty: number
    max_tokens: number
    presence_penalty: number
    top_p: number
  }
  bio?: string
  messages?: {
    displayed?: IMessage[]
    history?: string
  }
}

export interface IFirebaseResponseBots {
  [key: string]: AvatarModel[]
}

export interface IFirebaseResponseMasterPrompt {
  prompt: string
  introduce: string
}
