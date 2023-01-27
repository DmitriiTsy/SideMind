import { Container, IoCModule } from 'IoC'

import { ChatVM, IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import {
  ISelectAvatarsVM,
  ISelectAvatarsVMTid,
  SelectAvatarsVM
} from 'components/SelectAvatars'
import {
  BottomPanelVM,
  IBottomPanelVM,
  IBottomPanelVMTid
} from 'components/BottomPanel'
import { BlurVM, IBlurVM, IBlurVMTid } from 'components/Blur'

export class ComponentsModule implements IoCModule {
  public Configure(ioc: Container) {
    ioc.bind<IChatVM>(IChatVMTid).to(ChatVM).inSingletonScope()
    ioc
      .bind<ISelectAvatarsVM>(ISelectAvatarsVMTid)
      .to(SelectAvatarsVM)
      .inSingletonScope()
    ioc
      .bind<IBottomPanelVM>(IBottomPanelVMTid)
      .to(BottomPanelVM)
      .inSingletonScope()
    ioc.bind<IBlurVM>(IBlurVMTid).to(BlurVM).inSingletonScope()
  }
}
