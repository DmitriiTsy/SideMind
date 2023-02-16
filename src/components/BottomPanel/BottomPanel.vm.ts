import { action, observable } from 'mobx'

import { Injectable } from 'IoC'
import { EBottomPanelContent } from 'components/BottomPanel/types'
import { BOTTOM_PANEL_CONTENT } from 'components/BottomPanel/constants'

export const IBottomPanelVMTid = Symbol.for('IBottomPanelVMTid')

export interface IBottomPanelVM {
  content: JSX.Element | null
  closing: boolean

  openPanel(content: EBottomPanelContent)
  closePanel()
}

@Injectable()
export class BottomPanelVM implements IBottomPanelVM {
  @observable opened = false
  @observable content = null
  @observable closing = false

  @action.bound
  openPanel(content: EBottomPanelContent) {
    this.content = BOTTOM_PANEL_CONTENT[content]
  }

  @action.bound
  closePanel() {
    this.closing = true
  }
}
