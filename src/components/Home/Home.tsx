import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ChatPreview } from './components/ChatPreview'

export const Home = () => {
  return (
    <View style={SS.container}>
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
      <ChatPreview />
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
