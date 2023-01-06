import { Container, IoCModule } from 'IoC'

import {
  ISelectBotsVM,
  ISelectBotsVMTid,
  SelectBotsVM
} from 'components/SelectBots/SelectBots.vm'
import { ChatVM, IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
} from '../store/Store.vm'

export class ComponentsModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc
      .bind<ISelectBotsVM>(ISelectBotsVMTid)
      .to(SelectBotsVM)
      .inSingletonScope()
    ioc.bind<IChatVM>(IChatVMTid).to(ChatVM).inSingletonScope()
  }
}
