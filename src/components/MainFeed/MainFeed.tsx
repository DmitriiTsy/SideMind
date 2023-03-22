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

import { AvatarModel } from 'services/FirebaseService/types'

import { useInject } from 'IoC'
import { IAppStore, IAppStoreTid } from 'store/AppStore'

import { Svg } from 'components/ui/Svg'

import { deviceWidth } from 'utils/dimentions'

import {ILocalizationService, ILocalizationServiceTid, INavigationService, INavigationServiceTid} from 'services'

import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'

import { EBottomPanelContent } from 'components/BottomPanel/types'

import { ChatPreview, NewAvatar } from './components'
import {CommonScreenName} from "constants/screen.types";

export const MainFeed = observer(() => {
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const bottomPanelVM = useInject<IBottomPanelVM>(IBottomPanelVMTid)
  const appStore = useInject<IAppStore>(IAppStoreTid)

  const openPanel = useCallback(() => {
    appStore.updateAvatarsFromFirebase()
    bottomPanelVM.openPanel(EBottomPanelContent.AddMind)
  }, [appStore, bottomPanelVM])

  const openMenu = () => {
    navigation.navigate(CommonScreenName.Menu);
  }

  const header = useMemo(
    () => (
      <View style={SS.headerContainer}>
        <Pressable onPress={openMenu} style={{paddingLeft: 16}}>
          <Svg name={'Menu'}/>
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
    [openPanel, t]
  )

  const renderItem = ({ item, index }: ListRenderItemInfo<AvatarModel>) => {
    return <ChatPreview avatar={item} index={index} />
  }

  const keyExtractor = (item, index) => index

  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      {header}
      <FlatList
        data={appStore.usersAvatars}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={NewAvatar}
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
    justifyContent: 'space-between',
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addnote: {
    paddingRight: 14
  }
})
