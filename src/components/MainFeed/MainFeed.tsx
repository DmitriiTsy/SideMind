import React from 'react'
import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'

import { BotModel } from 'services/FirebaseService/types'

import {
  MainFeedHeader,
  MainFeedNewSideMind,
  InChatPreview
} from './components'

export const MainFeed = () => {
  const renderItem = ({ item }: ListRenderItemInfo<BotModel[]>) => (
    <View>
      <InChatPreview item={item} />
      <InChatPreview item={item} />
      <InChatPreview item={item} />
    </View>
  )

  const keyExtractor = (item, index) => index
  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      <MainFeedHeader />
      <View>
        <FlatList
          data={'a'}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        <MainFeedNewSideMind />
      </View>
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#000000'
  }
})
