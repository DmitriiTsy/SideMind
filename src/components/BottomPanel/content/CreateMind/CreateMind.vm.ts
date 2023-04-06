import uuid from 'react-native-uuid'
import { action, computed, observable } from 'mobx'

import { Alert, Keyboard, TextInput } from 'react-native'

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

type AvatarPreview = Pick<AvatarModel, 'name' | 'tagLine' | 'uri'>

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

  editableAvatar: AvatarModel | undefined
  readonly previewAvatar: AvatarPreview | undefined

  hasError: keyof Translation | boolean
  ownerError: keyof Translation | boolean

  init(avatarID?: string | number): void

  submit(): void
  goBack(): void
  deleteMind(): void
}

@Injectable()
export class CreateMindVM implements ICreateMindVM {
  @observable pending = false
  @observable image: IImage | null = null

  inputName: InputVM
  inputTagLine: InputVM
  inputBio: InputVM
  inputGenerateAvatar: InputVM

  @observable editableAvatar: AvatarModel | undefined
  @observable previewAvatar: AvatarPreview | undefined

  constructor(
    @Inject(IOpenAIServiceTid) private _OpenAIService: IOpenAIService,
    @Inject(IChatVMTid) private _chatVM: IChatVM,
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
  init(avatarID?: string | number) {
    this.editableAvatar = this._appStore.usersAvatars.find(
      (el) => el.data.id === avatarID
    )?.data
    this.image = null

    const refInputName = createRef<TextInput>()
    const refInputTag = createRef<TextInput>()
    const refInputBio = createRef<TextInput>()

    // const isEditable = this.editableAvatar
    //   ? this.editableAvatar.category === EAvatarsCategory.Custom &&
    //     this.editableAvatar.creatorId === this._systemInfoService.deviceId
    //   : true

    const isEditable = !this.ownerError

    const isDefaultAvatar =
      this.editableAvatar &&
      this.editableAvatar.category !== EAvatarsCategory.Custom

    this.inputName = new InputVM({
      label: 'full name',
      placeholder: isDefaultAvatar
        ? this.editableAvatar.name
        : this._t.get('placeholder full name'),
      minLength: 2,
      maxLength: 30,
      errorText: 'name requirements',
      autoFocus: !this.editableAvatar ? true : isEditable,
      ref: refInputName,
      onSubmitEditing: () => {
        refInputName.current.blur()
        refInputTag.current.focus()
      },
      defaultValue:
        this.editableAvatar && !isDefaultAvatar && this.editableAvatar.name,
      editable: isEditable
    })
    this.inputTagLine = new InputVM({
      label: 'tagline',
      placeholder: isDefaultAvatar
        ? this.editableAvatar.tagLine
        : this._t.get('placeholder tagline'),
      minLength: 5,
      maxLength: 47,
      errorText: 'tagline requirements',
      ref: refInputTag,
      onSubmitEditing: () => {
        refInputTag.current.blur()
        refInputBio.current.focus()
      },
      defaultValue:
        this.editableAvatar && !isDefaultAvatar && this.editableAvatar.tagLine,
      editable: isEditable
    })
    this.inputBio = new InputVM({
      label: 'bio',
      placeholder: isDefaultAvatar
        ? this.editableAvatar.bio
        : this._t.get('placeholder bio'),
      minLength: 10,
      errorText: 'bio requirements',
      ref: refInputBio,
      defaultValue:
        this.editableAvatar && !isDefaultAvatar && this.editableAvatar.bio,
      editable: isEditable
    })
    this.inputGenerateAvatar = new InputVM({
      label: 'generate avatar input label',
      placeholder: 'generate avatar placeholder'
    })
  }

  @computed
  get hasError() {
    return (
      this.ownerError ||
      this.inputName.hasError ||
      this.inputTagLine.hasError ||
      this.inputBio.hasError
    )
  }

  @computed
  get ownerError() {
    return this.editableAvatar &&
      this.editableAvatar.creatorId !== this._systemInfoService.deviceId
      ? 'cant edit someones avatar'
      : false
  }

  @action.bound
  goBack() {
    if (this.editableAvatar) {
      this._bottomPanelVM.closePanel()
    } else {
      this._bottomPanelVM.openPanel(EBottomPanelContent.AddMind)
    }
  }

  @action.bound
  async deleteMind() {
    Keyboard.dismiss()
    this.pending = true

    await this._firebaseService.deleteCustomAvatar(this.editableAvatar.id)
    this._appStore.removeCustomAvatar(this.editableAvatar.id)

    this._bottomPanelVM.closePanel()
    this._navigationService.navigate(CommonScreenName.Drawer)

    this.pending = false
  }

  @action.bound
  submit() {
    const error = this.hasError

    if (error) {
      Alert.alert(this._t.get(error), '', [], { userInterfaceStyle: 'dark' })
    } else {
      this.previewAvatar = {
        name: this.inputName.value,
        tagLine: this.inputTagLine.value,
        uri: this.image?.localePath
      }
      if (this.editableAvatar) {
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
      : this.editableAvatar.imagePath

    const master = await this._firebaseService.getMasterPrompt()
    master.prompt = master.prompt.replace('{generated name by user}', name)
    master.prompt = master.prompt.replace('{generated bio by user}', bio)

    const generatedPrompt = `${await this._OpenAIService.generatePrompt(
      master.prompt,
      this.editableAvatar.id
    )}${master.introduce}`

    const editedAvatar: AvatarModel = {
      name,
      tagLine,
      imagePath,
      category: this.editableAvatar.category,
      id: this.editableAvatar.id,
      prompt: generatedPrompt,
      params: this.editableAvatar.params,
      bio: bio,
      creatorId: this.editableAvatar.creatorId
    }

    await this._appStore.editCustomAvatar(editedAvatar, this.image?.localePath)

    this._chatVM.setAvatar(
      this._appStore.usersAvatars.find((el) => el.data.id === editedAvatar.id)
    )
    this._bottomPanelVM.closePanel()

    this.pending = false
  }

  async _createAvatar() {
    this.pending = true

    const name = this.inputName.value
    const bio = this.inputBio.value
    const tagLine = this.inputTagLine.value
    const image = this.image
    const imagePath = image
      ? `Custom/${this._systemInfoService.deviceId}/${image.fileName}`
      : ''
    const id = uuid.v4() as string

    const master = await this._firebaseService.getMasterPrompt()
    master.prompt = master.prompt.replace('{generated name by user}', name)
    master.prompt = master.prompt.replace('{generated bio by user}', bio)

    const generatedPrompt = `${await this._OpenAIService.generatePrompt(
      master.prompt,
      id
    )}${master.introduce}`

    const avatar = {
      name,
      tagLine,
      imagePath,
      category: EAvatarsCategory.Custom,
      id,
      prompt: generatedPrompt,
      params: {
        temperature: 0.73,
        frequency_penalty: 0,
        max_tokens: 721,
        presence_penalty: 0,
        top_p: 1
      },
      bio: bio,
      creatorId: this._systemInfoService.deviceId
    }

    await this._appStore.updateUsersAvatars(
      avatar,
      imagePath,
      image ? image.localePath : ''
    )
    this._chatVM.setAvatar(
      this._appStore.usersAvatars.find((el) => el.data.id === avatar.id)
    )
    this._bottomPanelVM.closePanel()
    this._navigationService.navigate(CommonScreenName.Chat)

    this.pending = false
  }
}
