import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'
import { SelectSideMindsHeader } from 'components/SelectSideMinds/components'

export const SelectSideMinds = () => {
  return (
    <ScreenContainer
      topInsetColor={'black'}
      bottomInsetColor={'#1C1C1E'}
      style={SS.screenContainer}
    >
      <View style={SS.container}>
        <SelectSideMindsHeader />
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
