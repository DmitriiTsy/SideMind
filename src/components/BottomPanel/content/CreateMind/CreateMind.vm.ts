import uuid from 'react-native-uuid'
import { action, computed, observable } from 'mobx'

import { Alert, TextInput } from 'react-native'

import { createRef } from 'react'

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
import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'
import { AvatarModel, EAvatarsCategory } from 'services/FirebaseService/types'
import { EBottomPanelContent } from 'components/BottomPanel/types'

export const ICreateMindVMTid = Symbol.for('ICreateMindVMTid')

interface IImage {
  localePath: string
  fileName: string
}

export interface ICreateMindVM {
  pending: boolean
  image: IImage | null

  inputName: InputVM
  inputTagLine: InputVM
  inputBio: InputVM
  inputGenerateAvatar: InputVM

  editingAvatar: AvatarModel | undefined

  hasError: keyof Translation | boolean

  init(avatar?: AvatarModel): void

  submit(): void
  goBack(): void
}

@Injectable()
export class CreateMindVM implements ICreateMindVM {
  @observable pending = false
  @observable image: IImage | null = null

  inputName: InputVM
  inputTagLine: InputVM
  inputBio: InputVM
  inputGenerateAvatar: InputVM

  @observable editingAvatar: AvatarModel | undefined

  constructor(
    @Inject(IOpenAIServiceTid) private _OpenAIService: IOpenAIService,
    @Inject(IChatVMTid) private _ChatVM: IChatVM,
    @Inject(INavigationServiceTid)
    private _navigationService: INavigationService,
    @Inject(IBottomPanelVMTid) private _bottomPanelVM: IBottomPanelVM,
    @Inject(IAppStoreTid) private _appStore: IAppStore,
    @Inject(ILocalizationServiceTid) private _t: ILocalizationService,
    @Inject(IFirebaseServiceTid) private _firebaseService: IFirebaseService,
    @Inject(ISystemInfoServiceTid)
    private _systemInfoService: ISystemInfoService
  ) {}

  @action.bound
  init(avatar?: AvatarModel) {
    this.editingAvatar = avatar
    this.image = null

    const refInputName = createRef<TextInput>()
    const refInputTag = createRef<TextInput>()
    const refInputBio = createRef<TextInput>()

    this.inputName = new InputVM({
      label: 'full name',
      placeholder: 'placeholder full name',
      minLength: 2,
      errorText: 'name requirements',
      autoFocus: !avatar
        ? true
        : avatar.category === EAvatarsCategory.Custom && true,
      ref: refInputName,
      onSubmitEditing: () => {
        refInputName.current.blur()
        refInputTag.current.focus()
      },
      defaultValue: avatar && avatar.name,
      editable: avatar ? avatar.category === EAvatarsCategory.Custom : true
    })
    this.inputTagLine = new InputVM({
      label: 'tagline',
      placeholder: 'placeholder tagline',
      minLength: 5,
      errorText: 'tagline requirements',
      ref: refInputTag,
      onSubmitEditing: () => {
        refInputTag.current.blur()
        refInputBio.current.focus()
      },
      defaultValue: avatar && avatar.tagLine,
      editable: avatar ? avatar.category === EAvatarsCategory.Custom : true
    })
    this.inputBio = new InputVM({
      label: 'bio',
      placeholder: 'placeholder bio',
      minLength: 10,
      errorText: 'bio requirements',
      ref: refInputBio,
      defaultValue: avatar && avatar.bio,
      editable: avatar ? avatar.category === EAvatarsCategory.Custom : true
    })
    this.inputGenerateAvatar = new InputVM({
      label: 'generate avatar input label',
      placeholder: 'generate avatar placeholder'
    })
  }

  @computed
  get hasError() {
    return (
      this.inputName.hasError ||
      this.inputTagLine.hasError ||
      this.inputBio.hasError
    )
  }

  @action.bound
  goBack() {
    if (this.editingAvatar) {
      this._bottomPanelVM.closePanel()
    } else {
      this._bottomPanelVM.openPanel(EBottomPanelContent.AddMind)
    }
  }

  @action.bound
  submit() {
    const error = this.hasError

    if (error) {
      Alert.alert(this._t.get(error))
    } else {
      if (this.editingAvatar) {
        this._editAvatar()
      } else {
        this._createAvatar()
      }
    }
  }

  async _editAvatar() {
    this.pending = true

    const name = this.inputName.value
    const bio = this.inputBio.value
    const tagLine = this.inputTagLine.value
    const imagePath = this.image
      ? `Custom/${this._systemInfoService.deviceId}/${this.image.fileName}`
      : this.editingAvatar.imagePath

    const master = await this._firebaseService.getMasterPrompt()
    master.prompt = master.prompt.replace('{generated name by user}', name)
    master.prompt = master.prompt.replace('{generated bio by user}', bio)

    const generatedPrompt = `${await this._OpenAIService.generatePrompt(
      master.prompt
    )}${master.introduce}`

    const editedAvatar: AvatarModel = {
      name,
      tagLine,
      imagePath,
      category: this.editingAvatar.category,
      id: this.editingAvatar.id,
      prompt: generatedPrompt,
      params: this.editingAvatar.params,
      bio: bio
    }

    await this._appStore.editCustomAvatar(editedAvatar, this.image?.localePath)

    this._ChatVM.setAvatar(
      this._appStore.usersAvatars.find((el) => el.id === editedAvatar.id)
    )
    this._bottomPanelVM.closePanel()

    this.pending = false
  }

  async _createAvatar() {
    this.pending = true
    console.log('create avatar')

    const name = this.inputName.value
    const bio = this.inputBio.value
    const tagLine = this.inputTagLine.value
    const image = this.image
    const imagePath = image
      ? `Custom/${this._systemInfoService.deviceId}/${image.fileName}`
      : ''

    const master = await this._firebaseService.getMasterPrompt()
    master.prompt = master.prompt.replace('{generated name by user}', name)
    master.prompt = master.prompt.replace('{generated bio by user}', bio)

    const generatedPrompt = `${await this._OpenAIService.generatePrompt(
      master.prompt
    )}${master.introduce}`

    const avatar = {
      name,
      tagLine,
      imagePath,
      category: EAvatarsCategory.Custom,
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

    await this._appStore.updateUsersAvatars(
      avatar,
      imagePath,
      image ? image.localePath : ''
    )
    this._ChatVM.setAvatar(
      this._appStore.usersAvatars.find((el) => el.id === avatar.id)
    )
    this._bottomPanelVM.closePanel()
    this._navigationService.navigate(CommonScreenName.Chat)

    this.pending = false
  }
}
