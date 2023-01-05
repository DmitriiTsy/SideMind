import { action, observable } from 'mobx'

import { Injectable } from 'IoC'

export const ISelectBotsVMTid = Symbol.for('ISelectBotsVMTid')

export interface ISelectBotsVM {
  selected: number[]
  addBot(id: number): void
}

@Injectable()
export class SelectBotsVM implements ISelectBotsVM {
  @observable selected: number[] = []

  @action.bound
  addBot(id: number) {
    if (this.selected.find((el) => el === id)) {
      this.selected = this.selected.filter((el) => el !== id)
    } else if (this.selected.length === 3) {
      this.selected.shift()
      this.selected.push(id)
    } else {
      this.selected.push(id)
    }
  }
}
