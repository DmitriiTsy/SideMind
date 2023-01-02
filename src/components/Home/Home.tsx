import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ChatPreview } from './components/ChatPreview'

export const Home = () => {
  return (
    <View style={SS.container}>
      <ChatPreview />
      {/* <Text style={SS.title}>Home Screen</Text> */}
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    color: 'white'
  }
})
