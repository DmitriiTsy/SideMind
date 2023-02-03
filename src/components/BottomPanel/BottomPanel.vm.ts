import { action, observable } from 'mobx'

import { Injectable } from 'IoC'
import { EBottomPanelContent } from 'components/BottomPanel/types'
import { BOTTOM_PANEL_CONTENT } from 'components/BottomPanel/constants'

export const IBottomPanelVMTid = Symbol.for('IBottomPanelVMTid')

export interface IBottomPanelVM {
  content: JSX.Element | null

  openPanel(content: EBottomPanelContent)
  closePanel()
}

@Injectable()
export class BottomPanelVM implements IBottomPanelVM {
  @observable opened = false
  @observable content = null

  @action.bound
  toggle() {
    this.opened = !this.opened
  }

  @action.bound
  openPanel(content: EBottomPanelContent) {
    this.content = BOTTOM_PANEL_CONTENT[content]
  }

  @action.bound
  closePanel() {
    this.content = null
  }
}
