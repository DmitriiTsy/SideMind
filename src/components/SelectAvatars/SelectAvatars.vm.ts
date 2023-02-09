import { computed } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { AvatarModel } from 'services/FirebaseService/types'

export const ISelectAvatarsVMTid = Symbol.for('ISelectAvatarsVMTid')

export interface ISelectAvatarsVM {
  commonAvatars: AvatarModel[][]

  setAvatars(avatar: AvatarModel): void
}

@Injectable()
export class SelectAvatarsVM implements ISelectAvatarsVM {
  constructor(@Inject(IAppStoreTid) private readonly _appStore: IAppStore) {}

  @computed
  get commonAvatars() {
    return this._appStore.commonAvatars
  }

  setAvatars(avatar: AvatarModel) {
    this._appStore.setUsersAvatars(avatar)
  }
}
