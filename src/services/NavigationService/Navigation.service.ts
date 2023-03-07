import { Route } from '@react-navigation/routers'

import { RefObject } from 'react'
import {
  NavigationContainerRef,
  NavigationState,
  PartialState,
  StackActions
} from '@react-navigation/native'

import { action, computed, observable } from 'mobx'

import { Injectable } from 'IoC'

import { ScreenName, ScreenParamTypes } from 'constants/screen.types'

export const INavigationServiceTid = Symbol.for('INavigationServiceTid')

export interface INavigationService<RouteName extends ScreenName = any> {
  canGoBack: boolean
  currentRoute?: Route<string>

  params: ScreenParamTypes[RouteName]

  navigate<RouteName extends ScreenName>(
    name: RouteName,
    params?: ScreenParamTypes[RouteName]
  ): void

  popToTop(): void

  goBack(): void

  init(navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>): void

  emitNavigationStateChange(): void

  isReady(): boolean

  setParamsFromUrl(url: string): void

  reset(state: PartialState<NavigationState> | NavigationState): void
}

@Injectable()
export class NavigationService implements INavigationService {
  @observable.ref currentRoute?: Route<string>
  @observable private _navigationRef: RefObject<
    NavigationContainerRef<ScreenParamTypes>
  >
  @observable _params: ScreenParamTypes[ScreenName]

  @computed
  get params() {
    return this._params
  }

  @computed
  get canGoBack() {
    return this._navigationRef?.current?.canGoBack() || false
  }

  @action.bound
  navigate<RouteName extends ScreenName>(
    name: RouteName,
    params?: ScreenParamTypes[RouteName]
  ) {
    this._navigationRef?.current?.navigate({ name, params })
  }

  @action.bound
  popToTop() {
    this._navigationRef.current.dispatch(StackActions.popToTop)
  }

  @action.bound
  init(navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>) {
    this._navigationRef = navigationRef
    this.emitNavigationStateChange()
  }

  @action.bound
  emitNavigationStateChange() {
    this.currentRoute = this._navigationRef?.current?.getCurrentRoute()
    this._params = this._navigationRef?.current?.getCurrentRoute()
      .params as ScreenParamTypes[ScreenName]
  }

  setParamsFromUrl(url: string) {
    if (url) {
      const params = url.replace('sidemind://chat/', '').split('/')
      if (params) {
        this._navigationRef?.current?.setParams({
          bID: params[1],
          general: /^true$/i.test(params[2]),
          starting: /^true$/i.test(params[3])
        })
      }
    }
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

  isReady() {
    return this._navigationRef?.current?.isReady()
  }
}
