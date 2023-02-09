import React, { FC, useCallback, useMemo } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent
} from 'react-native'

import HapticFeedback from 'react-native-haptic-feedback'

import { useInject } from 'IoC'
import { deviceWidth } from 'utils/dimentions'
import { ESender, IMessage } from 'components/Chat/types'
import { IBlurVM, IBlurVMTid } from 'components/Blur'
import { MessageToCopy } from 'components/Chat/components/MessageToCopy'

interface IMessageProps {
  message: IMessage
  index: number
}

export const Message: FC<IMessageProps> = ({ message, index }) => {
  const blurVM = useInject<IBlurVM>(IBlurVMTid)
  const isBot = useMemo(() => message.sender === ESender.BOT, [message.sender])
  const isLast = useMemo(() => index === 0, [index])

  const measure = useCallback(
    (e: GestureResponderEvent): Promise<number> =>
      new Promise((resolve) => {
        e.target.measure((x, y, width, height, pageX, pageY) => resolve(pageY))
      }),
    []
  )

  const showBlur = useCallback(
    async (e: GestureResponderEvent) => {
      const y = await measure(e)
      HapticFeedback.trigger('impactMedium')
      blurVM.show(() => (
        <MessageToCopy positionY={y} isBot={isBot} text={message.text} />
      ))
    },
    [blurVM, isBot, measure, message.text]
  )

  return (
    <View style={isBot ? SS.mainContainerBot : SS.mainContainerHuman}>
      <Pressable
        style={[
          SS.container,
          isBot ? SS.fromBot : SS.fromHuman,
          isLast && SS.last
        ]}
        onLongPress={showBlur}
      >
        <Text style={SS.text}>{message.text.trim()}</Text>
      </Pressable>
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
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    color: '#FFF'
  }
})
