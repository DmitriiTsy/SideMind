import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'

import { MainFeedHeader } from './components'

import { InChatPreview } from './components/InChatPreview'

import { MainFeedNewSideMind } from './components'

export const MainFeed = () => {
  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      <View style={SS.container}>
        <MainFeedHeader />
      </View>
      <View>
        <InChatPreview />
        <InChatPreview />
        <InChatPreview />
        <InChatPreview />
        <MainFeedNewSideMind />
      </View>
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  screenContainer: {
    backgroundColor: '#000000'
  }
})
