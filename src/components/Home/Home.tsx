import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Home = () => {
  return (
    <View style={SS.container}>
      <Text>Home Screen</Text>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1
  }
})
