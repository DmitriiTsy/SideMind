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
  }
}
