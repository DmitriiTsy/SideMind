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
  SelfImprovement = 'Self-Improvement',
  Custom = 'Custom',
  Productivity = 'Productivity',
  Hobbies = 'Hobbies',
  Relationships = 'Relationships',
  Entertainment = 'Entertainment',
  Historical = 'Historical'
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
  creatorId?: number | string
  bio: string
  messages?: {
    displayed?: IMessage[]
    history?: string
  }
  deleted?: boolean
  isAvatarUseModel3?: boolean
}

export interface IFirebaseResponseBots {
  [key: string]: AvatarModel[]
}

export interface IFirebaseResponseMasterPrompt {
  prompt: string
  introduce: string
}
