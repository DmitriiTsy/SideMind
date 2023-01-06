import { IoCModule, Container } from 'IoC'
import { ServiceModule } from 'services/service.module'
import { ComponentsModule } from 'components/components.module'
import { AppVM, IAppVM, IAppVMTid } from 'app/App.vm'
import { StoreModule } from 'store/store.module'

export class AppModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc.bind<IAppVM>(IAppVMTid).to(AppVM).inSingletonScope()

    const imports: IoCModule[] = [
      new ServiceModule(),
      new ComponentsModule(),
      new StoreModule()
    ]

    imports.forEach((i) => {
      i.Configure(ioc)
    })
  }
}
