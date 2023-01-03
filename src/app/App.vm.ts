import { RefObject } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import { Inject, Injectable } from 'IoC'
import {
  ILayoutService,
  ILayoutServiceTid,
  INavigationService,
  INavigationServiceTid
} from 'services'

import { ScreenParamTypes } from '../constants/screen.types'

export const IAppVMTid = Symbol.for('IAppVMTid')

export interface IAppVM {
  init(): void

  initNavigation(
    navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>
  ): void
}

@Injectable()
export class AppVM implements IAppVM {
  constructor(
    @Inject(INavigationServiceTid)
    private _navigationService: INavigationService,
    @Inject(ILayoutServiceTid) private _layoutService: ILayoutService
  ) {}

  init() {
    this._layoutService.init()
  }

  initNavigation(
    navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>
  ) {
    this._navigationService.init(navigationRef)
  }
}
