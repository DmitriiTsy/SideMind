import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'

import { ChatHeader } from 'components/Chat/components/ChatHeader'

import { ChatBottom } from './components'

export const Chat = () => {
  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      <View style={SS.container}>
        <ChatHeader />
      </View>
      <ChatBottom />
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  screenContainer: {
    backgroundColor: '#000000'
  }
})
