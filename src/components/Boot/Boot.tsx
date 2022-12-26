import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Svg } from 'components/ui/Svg/Svg'

export const Boot = () => {
  return (
    <View style={SS.container}>
      <Svg name={'Logo'} />
      <Text style={SS.title}>SideMind</Text>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white'
  }
})
