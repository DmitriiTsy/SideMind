import uuid from 'react-native-uuid'
import { action, observable } from 'mobx'

import { AvatarModel } from 'services/FirebaseService/types'
import { Inject, Injectable } from 'IoC'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'
import { CommonScreenName } from 'constants/screen.types'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'
import { INavigationService, INavigationServiceTid } from 'services'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { IAppStore, IAppStoreTid } from 'store/AppStore'

export const IContactCardVMTid = Symbol.for('IContactCardVMTid')

enum masterPrompt {
  prompt = `I want you to act as a prompt generator. Firstly, I will give you a 
  title like this: "Act as an English Pronunciation
   Helper for Turkish People". Then you give me a prompt like this: 
  \r\n
  "I want you to act as an English pronunciation assistant 
  for Turkish speaking people. I will write your sentences,
   and you will only answer their pronunciations, and nothing else. 
   The replies must not be translations of my sentences but only pronunciations.
   Pronunciations should use Turkish Latin letters for phonetics. 
   Do not write explanations on replies."
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
  avatar: AvatarModel
  pending: boolean
  requirementFields: boolean

  toggle(type: string, value: string): void
  clean(type: string): void
  cleanAll(): void
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
    @Inject(IOpenAIServiceTid) private _OpenAIService: IOpenAIService,
    @Inject(IChatVMTid) private _ChatVM: IChatVM,
    @Inject(INavigationServiceTid)
    private _navigationService: INavigationService,
    @Inject(IBottomPanelVMTid) private _bottomPanelVM: IBottomPanelVM,
    @Inject(IAppStoreTid) private _appStore: IAppStore
  ) {}
  @observable requirementFields = false
  @observable pending = false
  avatar: AvatarModel

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
    if (
      this.FullName !== undefined &&
      this.FullName.length > 5 &&
      this.Bio !== undefined &&
      this.Bio.length > 15 &&
      this.Tagline !== undefined &&
      this.Tagline.length > 5
    ) {
      this.requirementFields = true
    } else {
      this.requirementFields = false
    }
  }

  @action.bound
  cleanAll() {
    this.FullName = ''
    this.Tagline = ''
    this.Bio = ''
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
    this.pending = true
    this.MasterPromptOpenAi = `${masterPrompt.prompt} My first title is ${this.FullName} 
    who's bio is ${this.Bio}`
    this.GeneratedPromptOpenAi = `${await this._OpenAIService.createCompletionMaster(
      this.MasterPromptOpenAi,
      true
    )} \r\n Now I want you to introduce yourself to a new friend in under 10 words:###`
    this.avatar = {
      name: this.FullName,
      tagLine: this.Tagline,
      imagePath: 'bots/Roxy_The_Relaxer.png',
      category: 'Master',
      id: uuid.v4() as string,
      prompt: this.GeneratedPromptOpenAi,
      params: {
        temperature: 0.73,
        frequency_penalty: 0,
        max_tokens: 721,
        presence_penalty: 0,
        top_p: 1
      }
    }
    console.log(this.avatar.id)
    this.pending = false
    this.requirementFields = false
    this._appStore.updateUsersAvatars(this.avatar)
    this._ChatVM.setAvatar(this.avatar)
    this._bottomPanelVM.closePanel()
    this._navigationService.navigate(CommonScreenName.Chat)
  }
}
