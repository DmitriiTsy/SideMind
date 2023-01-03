import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ChatPreview } from './components/ChatPreview'
import { InChatPreview } from './components/InChatPreview'
import { ChatHeaders } from './components/ChatHeaders'

export const Home = () => {
  return (
    <View style={SS.container}>
      <ChatHeaders />
      <ChatPreview />
      <ChatPreview />
      <InChatPreview />
      <InChatPreview />
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1D',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    color: 'white'
  }
})
