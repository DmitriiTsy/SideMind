import { action, observable } from 'mobx'

import { Injectable } from 'IoC'

export const IContactCardVMTid = Symbol.for('IContactCardVMTid')

export interface IContactCardVM {
  selected: any
  enabled: boolean
  Tagline: string
  Bio: string
  FullName: string

  toggle(type: string, value: string): void
  clean(type: string): void
}

enum placeholder {
  FullName = 'Enter first name',
  Tagline = 'Enter tagline',
  Bio = 'Enter bio'
}

@Injectable()
export class ContactCardVM implements IContactCardVM {
  Tagline: string
  Bio: string
  FullName: string
  selected: any
  values: object
  @observable enabled = true

  @action.bound
  toggle(type: string, value: string) {
    if (type === placeholder.FullName ) {
      this.FullName = value
    } else if (type === placeholder.Tagline) {
      this.Tagline = value
    } else if (type === placeholder.Bio) {
      this.Bio = value
    }
  }

  @action.bound
  clean(type: string) {
    if (type === placeholder.FullName ) {
      this.FullName = ''
    } else if (type === placeholder.Tagline) {
      this.Tagline = ''
    } else if (type === placeholder.Bio) {
      this.Bio = ''
    }
  }
}
