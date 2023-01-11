import { Route } from '@react-navigation/routers'

import { RefObject } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import { action, computed, observable } from 'mobx'

import { Injectable } from 'IoC'

import {
  CommonScreenName,
  ScreenName,
  ScreenParamTypes
} from 'constants/screen.types'

export const INavigationServiceTid = Symbol.for('INavigationServiceTid')

export interface INavigationService<RouteName extends ScreenName = any> {
  canGoBack: boolean
  currentRoute?: Route<string>
  customParams: ScreenParamTypes[RouteName]
  params: ScreenParamTypes[RouteName]

  navigate<RouteName extends ScreenName>(
    name: RouteName,
    params?: ScreenParamTypes[RouteName]
  ): void

  goBack(): void

  init(navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>): void

  emitNavigationStateChange(): void
}

@Injectable()
export class NavigationService implements INavigationService {
  @observable.ref currentRoute?: Route<string>
  @observable customParams
  private _navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>

  @computed
  get canGoBack() {
    return this._navigationRef?.current?.canGoBack() || false
  }

  @computed
  get params() {
    return this._navigationRef?.current?.getCurrentRoute()?.params || {}
  }

  @action.bound
  navigate<RouteName extends ScreenName>(
    name: RouteName,
    params?: ScreenParamTypes[RouteName]
  ) {
    if (name === CommonScreenName.SelectBots) {
      this.customParams = params
    }
    this._navigationRef?.current?.navigate({ name, params, merge: true })
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

  goBack() {
    if (this.canGoBack) {
      this._navigationRef?.current?.goBack()
      return
    }
  }
}
