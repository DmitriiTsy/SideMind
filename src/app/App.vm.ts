import { RefObject } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import { Inject, Injectable } from 'IoC'
import { INavigationServiceVM, INavigationServiceVMTid } from 'services'

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
    @Inject(INavigationServiceVMTid)
    private _navigationService: INavigationServiceVM
  ) {}

  init() {}

  initNavigation(
    navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>
  ) {
    this._navigationService.init(navigationRef)
  }
}
