import { useMemo, useState } from 'react'

import { SVG_MAP } from 'components/ui/Svg/constants'
import { useInject } from 'IoC'
import { IShareService, IShareServiceTId } from 'services/ShareService'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

export interface IShareOption {
  icon: keyof typeof SVG_MAP
  text: string
  onPress: () => void
}

export const useShareOptions = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const shareService = useInject<IShareService>(IShareServiceTId)

  const shareOptions: IShareOption[] = useMemo(
    () => [
      {
        icon: 'ShareMind',
        text: 'Share Mind',
        onPress: () => {
          setModalVisible(false)
          setTimeout(() => {
            shareService.shareAvatar(chatVM.avatar)
          }, 100)
        }
      },
      {
        icon: 'ShareConversation',
        text: 'Share Conversation',
        onPress: () => {
          setModalVisible(false)
          setTimeout(() => {
            shareService.shareConversation()
          }, 100)
        }
      },
      {
        icon: 'ShareApp',
        text: 'Share App',
        onPress: () => {
          setModalVisible(false)
          setTimeout(() => {
            shareService.shareApp()
          }, 100)
        }
      }
    ],
    [chatVM.avatar, shareService]
  )

  return {
    modalVisible,
    setModalVisible: (value: boolean) => () => setModalVisible(value),
    shareOptions
  }
}
