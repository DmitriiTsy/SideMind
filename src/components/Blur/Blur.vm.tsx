import { action, observable } from 'mobx'

import { Injectable } from 'IoC'

export const IBlurVMTid = Symbol.for('IBlurVMTid')

export interface IBlurVM {
  content: () => JSX.Element | null

  onClose: () => Promise<void> | null

  show(content: () => JSX.Element): void
  hide(): void
}

@Injectable()
export class BlurVM implements IBlurVM {
  @observable content = null
  onClose = null

  @action.bound
  show(content: () => JSX.Element) {
    this.content = content
  }

  @action.bound
  async hide() {
    this.onClose && (await this.onClose())
    this.content = null
  }
}
