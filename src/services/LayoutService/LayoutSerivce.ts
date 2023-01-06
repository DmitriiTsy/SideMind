import { observable, runInAction } from 'mobx'
import {
  Animated,
  Keyboard,
  KeyboardEvent,
  Platform,
  StatusBar
} from 'react-native'
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

  keyboardHeight: Animated.Value
  keyboardIsVisible: boolean

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

  keyboardHeight: Animated.Value
  @observable keyboardIsVisible: boolean

  get statusBarHeight() {
    return StatusBar.currentHeight || 0
  }

  async init() {
    const insets = await currentInsets()
    this.insets = { ...insets, top: insets.top + this.statusBarHeight }
    this.keyboardHeight = new Animated.Value(0)

    const keyboardWillShowSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      this._keyboardWillShow
    )
    const keyboardWillHideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      this._keyboardWillHide
    )
  }

  _keyboardWillShow = (e: KeyboardEvent) => {
    runInAction(() => (this.keyboardIsVisible = true))
    Animated.timing(this.keyboardHeight, {
      toValue: e.endCoordinates.height,
      duration: e.duration || 0,
      useNativeDriver: false
    }).start()
  }

  _keyboardWillHide = (e: KeyboardEvent) => {
    Animated.timing(this.keyboardHeight, {
      toValue: 0,
      duration: e.duration || 0,
      useNativeDriver: false
    }).start(() => runInAction(() => (this.keyboardIsVisible = false)))
  }
}
