import { IoCModule, Container } from 'IoC'
import { ServiceModule } from 'services/service.module'
import { AppVM, IAppVM, IAppVMTid } from 'app/App.vm'

export class AppModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc.bind<IAppVM>(IAppVMTid).to(AppVM).inSingletonScope()

    const imports: IoCModule[] = [new ServiceModule()]

    imports.forEach((i) => {
      i.Configure(ioc)
    })
  }
}
