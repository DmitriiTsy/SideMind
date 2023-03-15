import { RefObject } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import * as BootSplash from 'react-native-bootsplash'

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
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import {
  IPushNotificationsService,
  IPushNotificationsServiceTid
} from 'services/PushNotificationsService/PushNotificationsService'
import {
  IDeepLinkingService,
  IDeepLinkingServiceTid
} from 'services/DeepLinkingService'

export const IAppVMTid = Symbol.for('IAppVMTid')

export interface IAppVM {
  readonly deeplink: IDeepLinkingService

  init(): void

  initNavigation(
    navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>
  ): void

  emitNavigationStateChange(): void

  onReady(): void
}

@Injectable()
export class AppVM implements IAppVM {
  constructor(
    @Inject(INavigationServiceTid)
    private _navigationService: INavigationService,
    @Inject(ILayoutServiceTid) private _layoutService: ILayoutService,
    @Inject(IOpenAIServiceTid) private _openAIService: IOpenAIService,
    @Inject(IAppStoreTid) private _appStore: IAppStore,
    @Inject(IFirebaseServiceTid) private _firebaseService: IFirebaseService,
    @Inject(IPushNotificationsServiceTid)
    private _pushNotificationService: IPushNotificationsService,
    @Inject(IDeepLinkingServiceTid)
    public readonly deeplink: IDeepLinkingService
  ) {}

  async init() {
    this._layoutService.init()
    this._openAIService.init()
    this._appStore.init()
    await Promise.all([
      this._firebaseService.init(),
      this._pushNotificationService.init()
    ])
  }

  initNavigation(
    navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>
  ) {
    this._navigationService.init(navigationRef)
  }

  emitNavigationStateChange = () => {
    this._navigationService.emitNavigationStateChange()
  }

  onReady() {
    BootSplash.hide({ fade: true, duration: 500 })
  }
}
