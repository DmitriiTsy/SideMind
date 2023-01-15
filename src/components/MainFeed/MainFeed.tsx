import React, { useCallback, useMemo } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { observer } from 'mobx-react'

import { ScreenContainer } from 'components/ScreenContainer'

import { BotModel } from 'services/FirebaseService/types'

import { useInject } from 'IoC'
import { IAppStore, IAppStoreTid } from 'store/AppStore'

import { Svg } from 'components/ui/Svg'

import { deviceWidth } from 'utils/dimentions'

import {
  ILocalizationService,
  ILocalizationServiceTid,
  INavigationService,
  INavigationServiceTid
} from 'services'

import { CommonScreenName } from 'constants/screen.types'

import { ChatPreview, NewBot } from './components'

export const MainFeed = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const appStore = useInject<IAppStore>(IAppStoreTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)

  const onPressGetBack = useCallback(() => {
    navigation.navigate(CommonScreenName.SelectBots, {
      isStarting: false
    })
  }, [navigation])

  const header = useMemo(
    () => (
      <View style={SS.headerContainer}>
        <View style={SS.row}>
          <Svg name={'Logo'} />
          <Text style={SS.title}>{t.get('sideMind')}</Text>
        </View>
        <Pressable onPress={onPressGetBack}>
          <Svg name={'AddNote'} />
        </Pressable>
      </View>
    ),
    [onPressGetBack, t]
  )

  const renderItem = ({ item, index }: ListRenderItemInfo<BotModel>) => (
    <ChatPreview bot={item} index={index} />
  )

  const keyExtractor = (item, index) => index

  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      {header}
      <FlatList
        data={appStore.usedBots}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={NewBot}
      />
    </ScreenContainer>
  )
})

const SS = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#000000'
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    color: '#FFFFFF',
    marginLeft: 10.5
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    marginRight: 14
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: deviceWidth * 0.28
  }
})
