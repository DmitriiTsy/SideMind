import { RefObject } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import { Inject, Injectable } from 'IoC'
import {
  ILayoutService,
  ILayoutServiceTid,
  INavigationService,
  INavigationServiceTid
} from 'services'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'
import { ScreenParamTypes } from 'constants/screen.types'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'

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
    @Inject(ILayoutServiceTid) private _layoutService: ILayoutService,
    @Inject(IFirebaseServiceTid) private _firebaseService: IFirebaseService,
    @Inject(IOpenAIServiceTid) private _openAIService: IOpenAIService
  ) {}

  async init() {
    this._layoutService.init()
    this._openAIService.init()
    await this._firebaseService.init()
  }

  initNavigation(
    navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>
  ) {
    this._navigationService.init(navigationRef)
  }
}
