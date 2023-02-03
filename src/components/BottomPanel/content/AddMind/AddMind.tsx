import React, { useCallback } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { observer } from 'mobx-react'

import { Svg } from 'components/ui/Svg'
import { SkeletonAvatars } from 'components/SelectAvatars/components/skeleton/Skeleton'
import { useInject } from 'IoC'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { AvatarModel } from 'services/FirebaseService/types'
import { GroupedAvatars } from 'components/SelectAvatars/components/GroupedAvatars'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { EBottomPanelContent } from 'components/BottomPanel/types'

export const AddMind = observer(() => {
  const appStore = useInject<IAppStore>(IAppStoreTid)
  const bottomPanelVM = useInject<IBottomPanelVM>(IBottomPanelVMTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  const renderItem = ({ item }: ListRenderItemInfo<AvatarModel[]>) => {
    return <GroupedAvatars avatar={item} single />
  }

  const newMind = useCallback(() => {
    bottomPanelVM.openPanel(EBottomPanelContent.CreateMind)
  }, [bottomPanelVM])

  return (
    <>
      <View style={SS.headerContainer}>
        <View style={{ width: 20 }} />
        <Text style={SS.title}>{t.get('pick additional')}</Text>
        <Svg name={'Cross'} onPress={bottomPanelVM.closePanel} />
      </View>
      {appStore.commonAvatars.length === 0 ? (
        <SkeletonAvatars />
      ) : (
        <>
          <Pressable style={SS.containerNewMind} onPress={newMind}>
            <Svg name={'newMind'} />
            <View style={SS.addMindTextWrapper}>
              <Text style={SS.addMindText}>{t.get('new mind')}</Text>
            </View>
          </Pressable>
          <FlatList data={appStore.commonAvatars} renderItem={renderItem} />
        </>
      )}
    </>
  )
})

const SS = StyleSheet.create({
  headerContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#303030',
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 17
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF'
  },
  containerNewMind: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    alignItems: 'center',
    height: 45,
    paddingVertical: 16,
    marginTop: 20
  },
  addMindTextWrapper: {
    height: 45,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    width: '100%',
    borderColor: '#333333',
    marginLeft: 12
  },
  addMindText: {
    color: '#559EF8',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.3
  }
})
