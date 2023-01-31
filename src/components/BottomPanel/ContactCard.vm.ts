import { action, observable } from 'mobx'

import { Injectable } from 'IoC'

export const IContactCardVMTid = Symbol.for('IContactCardVMTid')

export interface IContactCardVM {
  selected: any
  toggle(): void
  enabled: boolean
}

@Injectable()
export class ContactCardVM implements IContactCardVM {
  selected: any
  @observable enabled = true

  @action.bound
  toggle() {
    this.enabled = !this.enabled
  }
}
