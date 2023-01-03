import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'

export const Home = () => {
  return (
    <ScreenContainer topInsetColor={'black'} bottomInsetColor={'black'}>
      <Text style={SS.title}>Home Screen</Text>
    </ScreenContainer>
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
