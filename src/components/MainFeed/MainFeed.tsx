import React, { useCallback, useMemo, useRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { observer } from 'mobx-react'

import { DrawerActions } from '@react-navigation/native'

import { ScrollView } from 'react-native-gesture-handler'

import { ScreenContainer } from 'components/ScreenContainer'

import { useInject } from 'IoC'
import { IAppStore, IAppStoreTid } from 'store/AppStore'

import { Svg } from 'components/ui/Svg'

import {
  ILocalizationService,
  ILocalizationServiceTid,
  INavigationService,
  INavigationServiceTid
} from 'services'

import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'

import { EBottomPanelContent } from 'components/BottomPanel/types'

import { SwipeableArea } from 'components/MainFeed/components/SwipableArea'

import { IAvatar } from '../../classes/Avatar'

import { ChatPreview, NewAvatar } from './components'

export const MainFeed = observer(() => {
  const navigationService = useInject<INavigationService>(INavigationServiceTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const bottomPanelVM = useInject<IBottomPanelVM>(IBottomPanelVMTid)
  const appStore = useInject<IAppStore>(IAppStoreTid)

  const ScrollRef = useRef(null)

  const openPanel = useCallback(() => {
    appStore.updateAvatarsFromFirebase()
    bottomPanelVM.openPanel(EBottomPanelContent.AddMind)
  }, [appStore, bottomPanelVM])

  const openMenu = useCallback(() => {
    navigationService.dispatch(DrawerActions.openDrawer())
  }, [navigationService])

  const removeAvatar = useCallback(
    (avatarId: string | number) => {
      appStore.removeAvatarFromList(avatarId)
    },
    [appStore]
  )

  const header = useMemo(
    () => (
      <View style={SS.headerContainer}>
        <Pressable onPress={openMenu} style={{ paddingLeft: 18 }}>
          <Svg name={'Menu'} />
        </Pressable>
        <View style={SS.row}>
          <Svg name={'Logo'} />
          <Text style={SS.title}>{t.get('sideMind')}</Text>
        </View>
        <Pressable onPress={openPanel} style={SS.addnote}>
          <Svg name={'AddNote'} />
        </Pressable>
      </View>
    ),
    [openMenu, openPanel, t]
  )

  const renderItem = (item: IAvatar | null, index) => {
    if (!item) {
      return <NewAvatar key={index} />
    }
    const action = () => removeAvatar(item.data.id)
    return (
      <SwipeableArea
        action={action}
        simultaneousHandlers={ScrollRef}
        key={item.data.id}
      >
        <ChatPreview avatar={item} index={index} />
      </SwipeableArea>
    )
  }

  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      {header}
      <ScrollView showsVerticalScrollIndicator={false} ref={ScrollRef}>
        {[...appStore.usersAvatars, null]
          .slice()
          .map((el, index) => renderItem(el, index))}
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addnote: {
    paddingRight: 14
  }
})
