import React, { FC, useCallback, useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'

import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { deviceWidth } from 'utils/dimentions'
import { ESender, IMessage } from 'components/Chat/types'
interface IMessageProps {
  message: IMessage
  index: number
}

export const Message: FC<IMessageProps> = ({ message, index }) => {
  const isBot = useMemo(() => message.sender === ESender.BOT, [message.sender])
  const isLast = useMemo(() => index === 0, [index])
  const chatVM = useInject<IChatVM>(IChatVMTid)

  const BlurToggleOn = useCallback(() => {
    Clipboard.setString('')
    chatVM.blurToggle(message.text.trim(), isBot)
  }, [chatVM, isBot, message.text])

  return (
    <View style={isBot ? SS.mainContainerBot : SS.mainContainerHuman}>
      <View
        style={[
          SS.container,
          isBot ? SS.fromBot : SS.fromHuman,
          isLast && SS.last
        ]}
      >
        <Pressable onLongPress={BlurToggleOn}>
          <Text style={SS.text}>{message.text.trim()}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const SS = StyleSheet.create({
  mainContainerBot: { alignItems: 'flex-start' },
  mainContainerHuman: { alignItems: 'flex-end' },
  container: {
    padding: 9,
    marginTop: 3,
    borderRadius: 12
  },
  fromBot: {
    backgroundColor: '#363637',
    borderBottomLeftRadius: 2,
    alignItems: 'flex-start',
    maxWidth: deviceWidth * 0.85,
    marginLeft: 12
  },
  fromHuman: {
    backgroundColor: '#549EF7',
    borderBottomRightRadius: 2,
    alignItems: 'flex-end',
    maxWidth: deviceWidth * 0.65,
    marginRight: 12
  },
  last: {
    marginBottom: 12,
    marginTop: 12
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    color: '#FFF'
  }
})
