import { Container, IoCModule } from 'IoC'

import {
  ISelectBotsVM,
  ISelectBotsVMTid,
  SelectBotsVM
} from '../store/Store.vm'

export class ComponentsModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc
      .bind<ISelectBotsVM>(ISelectBotsVMTid)
      .to(SelectBotsVM)
      .inSingletonScope()
  }
}
