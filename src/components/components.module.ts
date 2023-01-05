import { Container, IoCModule } from 'IoC'
import {
  ISelectBotsVM,
  ISelectBotsVMTid,
  SelectBotsVM
} from 'components/SelectBots/SelectBots.vm'

export class ComponentsModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc
      .bind<ISelectBotsVM>(ISelectBotsVMTid)
      .to(SelectBotsVM)
      .inSingletonScope()
  }
}
