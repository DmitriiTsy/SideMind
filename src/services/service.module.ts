import { IoCModule, Container } from 'IoC'
import {
  INavigationServiceVM,
  INavigationServiceVMTid,
  NavigationServiceVM
} from 'services/NavigationService'
import {
  ILocalizationServiceVM,
  ILocalizationServiceVMTid,
  LocalizationServiceVM
} from 'services/LocalizationService/LocalizationService'

export class ServiceModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc
      .bind<INavigationServiceVM>(INavigationServiceVMTid)
      .to(NavigationServiceVM)
      .inSingletonScope()
    ioc
      .bind<ILocalizationServiceVM>(ILocalizationServiceVMTid)
      .to(LocalizationServiceVM)
      .inSingletonScope()
  }
}
