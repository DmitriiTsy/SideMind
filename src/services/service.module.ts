import { IoCModule, Container } from 'IoC'
import {
  INavigationServiceVM,
  INavigationServiceVMTid,
  NavigationServiceVM
} from 'services/NavigationService'

export class ServiceModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc
      .bind<INavigationServiceVM>(INavigationServiceVMTid)
      .to(NavigationServiceVM)
      .inSingletonScope()
  }
}
