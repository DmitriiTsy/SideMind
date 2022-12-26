import { Route } from '@react-navigation/routers'

import { RefObject } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import { action, observable } from 'mobx'

import { Injectable } from 'IoC'

import { ScreenName, ScreenParamTypes } from '../../constants/screen.types'

export const INavigationServiceVMTid = Symbol.for('INavigationServiceVMTid')

export interface INavigationServiceVM<RouteName extends ScreenName = any> {
  canGoBack: boolean
  currentRoute?: Route<string>
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
export class NavigationServiceVM implements INavigationServiceVM {
  @observable.ref currentRoute?: Route<string>
  private _navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>

  get canGoBack() {
    return this._navigationRef?.current?.canGoBack() || false
  }

  get params() {
    return this._navigationRef?.current?.getCurrentRoute()?.params || {}
  }

  @action.bound
  navigate<RouteName extends ScreenName>(
    name: RouteName,
    params?: ScreenParamTypes[RouteName]
  ) {
    this._navigationRef?.current?.navigate(name, params)
  }

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
