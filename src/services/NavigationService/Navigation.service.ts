import { Route } from '@react-navigation/routers'

import { RefObject } from 'react'
import {
  NavigationContainerRef,
  NavigationState,
  PartialState
} from '@react-navigation/native'

import { action, computed, observable, runInAction } from 'mobx'

import { Injectable } from 'IoC'

import { ScreenName, ScreenParamTypes } from 'constants/screen.types'

export const INavigationServiceTid = Symbol.for('INavigationServiceTid')

export interface INavigationService<RouteName extends ScreenName = any> {
  canGoBack: boolean
  currentRoute?: Route<string>
  params: ScreenParamTypes[RouteName]
  unsafeParams: ScreenParamTypes[ScreenName]

  navigate<RouteName extends ScreenName>(
    name: RouteName,
    params?: ScreenParamTypes[RouteName]
  ): void

  goBack(): void

  init(navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>): void

  emitNavigationStateChange(): void

  reset(state: PartialState<NavigationState> | NavigationState): void

  subscribeUnsafeParams(): void
  unsubscribeUnsafeParams(): void
}

@Injectable()
export class NavigationService implements INavigationService {
  @observable.ref currentRoute?: Route<string>
  @observable _navigationRef: RefObject<
    NavigationContainerRef<ScreenParamTypes>
  >
  @observable _unsafeParams: ScreenParamTypes[ScreenName]

  @computed
  get canGoBack() {
    return this._navigationRef?.current?.canGoBack() || false
  }

  @computed
  get params() {
    return this._navigationRef?.current?.getCurrentRoute()?.params || {}
  }

  @computed
  get unsafeParams() {
    return this._unsafeParams
  }

  @action.bound
  navigate<RouteName extends ScreenName>(
    name: RouteName,
    params?: ScreenParamTypes[RouteName]
  ) {
    console.log(name, params)
    this._navigationRef?.current?.navigate({ name, params })
  }

  @action.bound
  init(navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>) {
    this._navigationRef = navigationRef
    this.emitNavigationStateChange()
  }

  @action.bound
  emitNavigationStateChange() {
    this.currentRoute = this._navigationRef?.current?.getCurrentRoute()
  }

  reset(state: PartialState<NavigationState> | NavigationState) {
    this._navigationRef?.current?.reset(state)
  }

  goBack() {
    if (this.canGoBack) {
      this._navigationRef?.current?.goBack()
      return
    }
  }

  subscribeUnsafeParams() {
    this._navigationRef.current.addListener('__unsafe_action__', (e) =>
      runInAction(() => (this._unsafeParams = e.data.action.payload?.params))
    )
  }

  unsubscribeUnsafeParams() {
    this._navigationRef.current.removeListener('__unsafe_action__', (e) =>
      runInAction(() => (this._unsafeParams = e.data.action.payload?.params))
    )
  }
}
