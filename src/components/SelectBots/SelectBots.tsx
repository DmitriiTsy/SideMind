import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'
import { SelectBotsHeader } from 'components/SelectBots/components'

export const SelectBots = () => {
  return (
    <ScreenContainer
      topInsetColor={'black'}
      bottomInsetColor={'#1C1C1E'}
      style={SS.screenContainer}
    >
      <View style={SS.container}>
        <SelectBotsHeader />
      </View>
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  screenContainer: {
    backgroundColor: 'black'
  }
})
