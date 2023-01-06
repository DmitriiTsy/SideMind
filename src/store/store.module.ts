import { Container, IoCModule } from 'IoC'

import { AppStore, IAppStore, IAppStoreTid } from './AppStore'

export class StoreModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc.bind<IAppStore>(IAppStoreTid).to(AppStore).inSingletonScope()
  }
}
