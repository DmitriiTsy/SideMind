import uuid from 'react-native-uuid'
import { action, computed, observable } from 'mobx'

import { Alert } from 'react-native'

import { Inject, Injectable } from 'IoC'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'
import {
  ILocalizationService,
  ILocalizationServiceTid,
  INavigationService,
  INavigationServiceTid
} from 'services'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { INPUTS } from 'components/BottomPanel/content/CreateMind/constants'
import {
  EInputType,
  ICreateMindInput
} from 'components/BottomPanel/content/CreateMind/types'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'

export const ICreateMindVMTid = Symbol.for('ICreateMindVMTid')

export interface ICreateMindVM {
  masterPrompt: string
  pending: boolean

  inputs: { [p: string]: ICreateMindInput }

  hasError: ICreateMindInput | undefined

  onChangeText(text: string, type: EInputType): void
  clean(type: EInputType): void
  cleanAll(): void
  submit(): void
}

@Injectable()
export class CreateMindVM implements ICreateMindVM {
  @observable pending = false
  @observable inputs = INPUTS

  masterPrompt: string

  constructor(
    @Inject(IOpenAIServiceTid) private _OpenAIService: IOpenAIService,
    @Inject(IChatVMTid) private _ChatVM: IChatVM,
    @Inject(INavigationServiceTid)
    private _navigationService: INavigationService,
    @Inject(IBottomPanelVMTid) private _bottomPanelVM: IBottomPanelVM,
    @Inject(IAppStoreTid) private _appStore: IAppStore,
    @Inject(ILocalizationServiceTid) private _t: ILocalizationService,
    @Inject(IFirebaseServiceTid) private _firebaseService: IFirebaseService
  ) {}

  @computed
  get hasError() {
    return Object.values(this.inputs).find(
      (el) => el.value.length < el.minLength
    )
  }

  @action.bound
  onChangeText(text: string, type: EInputType) {
    this.inputs[type].value = text
  }

  @action.bound
  cleanAll() {
    Object.values(this.inputs).map((el) => (el.value = ''))
  }

  @action.bound
  clean(type: EInputType) {
    this.inputs[type].value = ''
  }

  @action.bound
  submit() {
    const validate = Object.values(this.inputs).find(
      (el) => el.value.length < el.minLength
    )
    if (validate) {
      Alert.alert(this._t.get(validate.validateError))
    } else {
      this._masterPromptHandler()
    }
  }

  async _masterPromptHandler() {
    this.pending = true

    const name = this.inputs[EInputType.FullName].value
    const bio = this.inputs[EInputType.Bio].value
    const tagLine = this.inputs[EInputType.Tagline].value

    const master = await this._firebaseService.getMasterPrompt()
    master.prompt = master.prompt.replace('{generated name by user}', name)
    master.prompt = master.prompt.replace('{generated bio by user}', bio)

    const generatedPrompt = `${await this._OpenAIService.generatePrompt(
      master.prompt
    )}${master.introduce}`

    const avatar = {
      name,
      tagLine,
      imagePath: 'bots/Roxy_The_Relaxer.png',
      category: 'Master',
      id: uuid.v4() as string,
      prompt: generatedPrompt,
      params: {
        temperature: 0.73,
        frequency_penalty: 0,
        max_tokens: 721,
        presence_penalty: 0,
        top_p: 1
      }
    }
    this.pending = false
    // this._appStore.updateUsersAvatars(this.avatar)
    // this._ChatVM.setAvatar(this.avatar)
    // this._bottomPanelVM.closePanel()
    // this._navigationService.navigate(CommonScreenName.Chat)
  }
}
