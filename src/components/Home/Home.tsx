import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Home = () => {
  return (
    <View style={SS.container}>
      <Text style={SS.title}>Home Screen</Text>
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
