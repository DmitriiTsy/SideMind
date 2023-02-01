import { action, observable } from 'mobx'

import { Inject, Injectable } from 'IoC'

import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'

export const IContactCardVMTid = Symbol.for('IContactCardVMTid')

enum masterPrompt {
  prompt = `I want you to act as a prompt generator. Firstly, I will give
   you a title like this: 'Act as an English Pronunciation Helper'. 
  \r\n
  Then you give me a prompt like this:
  I want you to act as an English pronunciation assistant for 
  Turkish speaking people. 
  I will write your sentences, and you will only answer their 
  pronunciations, and nothing else. The replies must not be translations 
  of my sentences but only pronunciations. Pronunciations should use Turkish 
  Latin letters for phonetics. Do not write explanations on replies. 
  \r\n`
}

export interface IContactCardVM {
  selected: any
  enabled: boolean
  Tagline: string
  Bio: string
  FullName: string
  MasterPromptOpenAi: string
  GeneratedPromptOpenAi: string

  toggle(type: string, value: string): void
  clean(type: string): void
  masterPromptHandler(): void
}

enum placeholder {
  FullName = 'Enter first name',
  Tagline = 'Enter tagline',
  Bio = 'Enter bio'
}

@Injectable()
export class ContactCardVM implements IContactCardVM {
  constructor(
    @Inject(IOpenAIServiceTid) private _OpenAIService: IOpenAIService
  ) {}

  MasterPromptOpenAi: string
  GeneratedPromptOpenAi: string
  Tagline: string
  Bio: string
  FullName: string
  selected: any
  values: object
  @observable enabled = true

  @action.bound
  toggle(type: string, value: string) {
    if (type === placeholder.FullName) {
      this.FullName = value
    } else if (type === placeholder.Tagline) {
      this.Tagline = value
    } else if (type === placeholder.Bio) {
      this.Bio = value
    }
  }

  @action.bound
  clean(type: string) {
    if (type === placeholder.FullName) {
      this.FullName = ''
    } else if (type === placeholder.Tagline) {
      this.Tagline = ''
    } else if (type === placeholder.Bio) {
      this.Bio = ''
    }
  }

  @action.bound
  async masterPromptHandler() {
    this.MasterPromptOpenAi = `${masterPrompt.prompt} My first title is ${this.FullName} 
    who's bio is ${this.Bio}`
    const res = await this._OpenAIService.createCompletionMaster(
      this.MasterPromptOpenAi,
      true
    )
    console.log(res)
  }
}
