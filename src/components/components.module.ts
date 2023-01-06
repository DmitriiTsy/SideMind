import { Container, IoCModule } from 'IoC'

import { ChatVM, IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

export class ComponentsModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc.bind<IChatVM>(IChatVMTid).to(ChatVM).inSingletonScope()
  }
}
