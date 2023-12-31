import { IoCModule, Container } from 'IoC'
import {
  INavigationService,
  INavigationServiceTid,
  NavigationService
} from 'services/NavigationService'
import {
  ILocalizationService,
  ILocalizationServiceTid,
  LocalizationService
} from 'services/LocalizationService'
import {
  ILayoutService,
  ILayoutServiceTid,
  LayoutService
} from 'services/LayoutService'
import {
  FirebaseService,
  IFirebaseService,
  IFirebaseServiceTid
} from 'services/FirebaseService'
import {
  ISystemInfoService,
  ISystemInfoServiceTid,
  SystemInfoService
} from 'services/SystemInfoService'
import {
  IOpenAIService,
  IOpenAIServiceTid,
  OpenAIService
} from 'services/OpenAIService'

import {
  IPushNotificationsService,
  IPushNotificationsServiceTid,
  PushNotificationsService
} from 'services/PushNotificationsService'

import {
  DeepLinkingService,
  IDeepLinkingService,
  IDeepLinkingServiceTid
} from 'services/DeepLinkingService'

import {
  ITinyUrlService,
  ITinyUrlServiceTId,
  TinyUrlService
} from 'services/TinyUrlService/TinyUrlService'

import {
  IShareService,
  IShareServiceTId,
  ShareService
} from 'services/ShareService'

import {
  IStorageService,
  IStorageServiceTid,
  StorageService
} from './StorageService'

export class ServiceModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc
      .bind<INavigationService>(INavigationServiceTid)
      .to(NavigationService)
      .inSingletonScope()
    ioc
      .bind<ILocalizationService>(ILocalizationServiceTid)
      .to(LocalizationService)
      .inSingletonScope()
    ioc
      .bind<ILayoutService>(ILayoutServiceTid)
      .to(LayoutService)
      .inSingletonScope()
    ioc
      .bind<IFirebaseService>(IFirebaseServiceTid)
      .to(FirebaseService)
      .inSingletonScope()
    ioc
      .bind<ISystemInfoService>(ISystemInfoServiceTid)
      .to(SystemInfoService)
      .inSingletonScope()
    ioc
      .bind<IOpenAIService>(IOpenAIServiceTid)
      .to(OpenAIService)
      .inSingletonScope()
    ioc
      .bind<IStorageService>(IStorageServiceTid)
      .to(StorageService)
      .inSingletonScope()
    ioc
      .bind<IPushNotificationsService>(IPushNotificationsServiceTid)
      .to(PushNotificationsService)
      .inSingletonScope()
    ioc
      .bind<IDeepLinkingService>(IDeepLinkingServiceTid)
      .to(DeepLinkingService)
      .inSingletonScope()
    ioc
      .bind<ITinyUrlService>(ITinyUrlServiceTId)
      .to(TinyUrlService)
      .inSingletonScope()
    ioc
      .bind<IShareService>(IShareServiceTId)
      .to(ShareService)
      .inSingletonScope()
  }
}
