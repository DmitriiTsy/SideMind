import React, { FC, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ESender, IMessage } from 'components/Chat/Chat.vm'
import { deviceWidth } from 'utils/dimentions'

interface IMessageProps {
  message: IMessage
  index: number
}

export const Message: FC<IMessageProps> = ({ message, index }) => {
  const isBot = useMemo(() => message.sender === ESender.BOT, [message.sender])
  const isLast = useMemo(() => index === 0, [index])
  return (
    <View style={isBot ? SS.mainContainerBot : SS.mainContainerHuman}>
      <View
        style={[
          SS.container,
          isBot ? SS.fromBot : SS.fromHuman,
          isLast && SS.last
        ]}
      >
        <Text style={SS.text}>{message.text}</Text>
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