import { action, computed, observable } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { AvatarModel } from 'services/FirebaseService/types'

export const ISelectAvatarsVMTid = Symbol.for('ISelectAvatarsVMTid')

export interface ISelectAvatarsVM {
  commonAvatars: AvatarModel[][]
  selected: number[]

  select(id: number | string): void
  setAvatars(): void
}

@Injectable()
export class SelectAvatarsVM implements ISelectAvatarsVM {
  constructor(@Inject(IAppStoreTid) private readonly _appStore: IAppStore) {}

  @observable selected: number[] = []

  @computed
  get commonAvatars() {
    return this._appStore.commonAvatars
  }

  @action.bound
  select(id: number) {
    if (this.selected.find((el) => el === id)) {
      this.selected = this.selected.filter((el) => el !== id)
    } else if (this.selected.length === 3) {
      this.selected.shift()
      this.selected.push(id)
    } else {
      this.selected.push(id)
    }
  }

  setAvatars() {
    this._appStore.setUsersAvatars(this.selected)
  }
}
