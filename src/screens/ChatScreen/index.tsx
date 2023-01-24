import React from 'react'

import { observer } from 'mobx-react'

import { Chat } from 'components/Chat'
import { Blur } from 'components/Chat/components'
import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

export const ChatScreen = observer(() => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  return (
    <>
      <Chat />
      {chatVM.blur && <Blur />}
    </>
  )
})
