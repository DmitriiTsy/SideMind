import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'

import { MainFeedHeader } from './components'

import { InChatPreview } from './components/InChatPreview'

export const MainFeed = () => {
  return (
    <ScreenContainer
      topInsetColor={'black'}
      bottomInsetColor={'#1C1C1E'}
      style={SS.screenContainer}
    >
      <View style={SS.container}>
        <MainFeedHeader />
      </View>
      <InChatPreview />
      <InChatPreview />
      <InChatPreview />
      <InChatPreview />
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
