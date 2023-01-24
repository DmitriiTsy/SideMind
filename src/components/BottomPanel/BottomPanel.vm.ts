import { action, observable } from 'mobx'

import { Injectable } from 'IoC'

export const IBottomPanelVMTid = Symbol.for('IBottomPanelVMTid')

export interface IBottomPanelVM {
  opened: boolean

  toggle(): void
}

@Injectable()
export class BottomPanelVM implements IBottomPanelVM {
  @observable opened = false

  @action.bound
  toggle() {
    this.opened = !this.opened
  }
}
