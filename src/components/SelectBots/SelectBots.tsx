import React from 'react'
import { StyleSheet, FlatList, ListRenderItemInfo } from 'react-native'

import { observer } from 'mobx-react'

import { ScreenContainer } from 'components/ScreenContainer'
import { SelectBotsHeader } from 'components/SelectBots/components'

import { GroupedBots } from 'components/SelectBots/components/GroupedBots'

import { useInject } from 'IoC'

import { BotModel } from 'services/FirebaseService/types'
import { IAppStore, IAppStoreTid } from 'store/AppStore'

export const SelectBots = observer(() => {
  const appStore = useInject<IAppStore>(IAppStoreTid)
  const renderItem = ({ item }: ListRenderItemInfo<BotModel[]>) => (
    <GroupedBots bots={item} />
  )

  const keyExtractor = (item, index) => index

  return (
    <ScreenContainer
      topInsetColor={'black'}
      bottomInsetColor={'#1C1C1E'}
      style={SS.screenContainer}
    >
      <SelectBotsHeader />
      <FlatList
        data={appStore.availableBots}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        style={SS.flatList}
      />
    </ScreenContainer>
  )
})

const SS = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  flatList: {
    backgroundColor: '#1C1C1E'
  },
  screenContainer: {
    backgroundColor: 'black'
  }
})
