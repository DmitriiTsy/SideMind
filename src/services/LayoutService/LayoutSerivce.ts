import { observable } from 'mobx'
import { StatusBar } from 'react-native'
import { currentInsets } from '@delightfulstudio/react-native-safe-area-insets'

import { Injectable } from 'IoC'

export const ILayoutServiceTid = Symbol.for('ILayoutServiceTid')

export interface IInsets {
  left: number
  right: number
  top: number
  bottom: number
}

export interface ILayoutService {
  readonly insets: IInsets
  readonly statusBarHeight: number

  init(): void
}

@Injectable()
export class LayoutService implements ILayoutService {
  @observable.ref insets: IInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }

  get statusBarHeight() {
    return StatusBar.currentHeight || 0
  }

  async init() {
    const insets = await currentInsets()
    this.insets = { ...insets, top: insets.top + this.statusBarHeight }
  }
}
