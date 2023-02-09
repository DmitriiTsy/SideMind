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
  INavigationServiceTid,
  Translation
} from 'services'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'
import { CommonScreenName } from 'constants/screen.types'
import { InputVM } from 'components/Input/Input.vm'

export const ICreateMindVMTid = Symbol.for('ICreateMindVMTid')

export interface ICreateMindVM {
  masterPrompt: string
  pending: boolean
  uri: string | null

  edit: boolean
  inputName: InputVM
  inputTagLine: InputVM
  inputBio: InputVM
  inputGenerateAvatar: InputVM

  hasError: keyof Translation | boolean

  clearAll(): void
  submit(): void
}

@Injectable()
export class CreateMindVM implements ICreateMindVM {
  @observable pending = false
  @observable uri: string | null = null

  inputName: InputVM
  inputTagLine: InputVM
  inputBio: InputVM
  inputGenerateAvatar: InputVM

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
  ) {
    this.inputName = new InputVM({
      label: 'full name',
      placeholder: 'placeholder full name',
      minLength: 5,
      errorText: 'name requirements'
    })
    this.inputTagLine = new InputVM({
      label: 'tagline',
      placeholder: 'placeholder tagline',
      minLength: 5,
      errorText: 'tagline requirements'
    })
    this.inputBio = new InputVM({
      label: 'bio',
      placeholder: 'placeholder bio',
      minLength: 10,
      errorText: 'bio requirements'
    })
    this.inputGenerateAvatar = new InputVM({
      label: 'generate avatar input label',
      placeholder: 'generate avatar placeholder'
    })
  }
  edit: false

  @computed
  get hasError() {
    return (
      this.inputName.hasError ||
      this.inputTagLine.hasError ||
      this.inputBio.hasError
    )
  }

  @action.bound
  clearAll() {
    this.inputName.clear()
    this.inputTagLine.clear()
    this.inputBio.clear()
  }

  @action.bound
  submit() {
    const error = this.hasError

    if (error) {
      Alert.alert(this._t.get(error))
    } else {
      this._masterPromptHandler()
    }
  }

  async _masterPromptHandler() {
    this.pending = true

    const name = this.inputName.value
    const bio = this.inputBio.value
    const tagLine = this.inputTagLine.value
    const uri = this.uri

    const master = await this._firebaseService.getMasterPrompt()
    master.prompt = master.prompt.replace('{generated name by user}', name)
    master.prompt = master.prompt.replace('{generated bio by user}', bio)

    const generatedPrompt = `${await this._OpenAIService.generatePrompt(
      master.prompt
    )}${master.introduce}`

    const avatar = {
      name,
      tagLine,
      imagePath: uri,
      category: 'Master',
      id: uuid.v4() as string,
      prompt: generatedPrompt,
      params: {
        temperature: 0.73,
        frequency_penalty: 0,
        max_tokens: 721,
        presence_penalty: 0,
        top_p: 1
      },
      bio: bio
    }
    console.log(avatar)
    this._appStore.updateUsersAvatars(avatar)
    this._ChatVM.setAvatar(avatar)
    this._bottomPanelVM.closePanel()
    this._navigationService.navigate(CommonScreenName.Chat)

    this.pending = false
  }
}
