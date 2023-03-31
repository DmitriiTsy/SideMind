import { ChatCompletionRequestMessage } from 'openai'

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

//todo make CustomAvatarModel and DefaultAvatarModel inherit from BaseAvatarModel
export interface AvatarModel {
  name: string
  tagLine: string
  imagePath: string
  uri?: string
  category: EAvatarsCategory
  id: number | string
  prompt: string
  turbo_init?: ITurboInit //default avatars
  params: IAvatarModelParams
  creatorId?: number | string //custom avatars
  bio: string
  messages?: {
    displayed?: IMessage[]
    history?: string
    historyTurbo?: ChatCompletionRequestMessage[]
  }
  deleted?: boolean
  isAvatarUseModel3?: boolean
}

export interface IAvatarModelParams {
  temperature: number
  frequency_penalty: number
  max_tokens: number
  presence_penalty: number
  top_p: number
}

export interface IFirebaseResponseBots {
  [key: string]: AvatarModel[]
}

export interface IFirebaseResponseMasterPrompt {
  prompt: string
  introduce: string
}

export interface ITurboInit {
  system: string
  user: string
}
