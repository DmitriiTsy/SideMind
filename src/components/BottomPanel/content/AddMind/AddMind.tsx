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
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

export const AddMind = observer(() => {
  const appStore = useInject<IAppStore>(IAppStoreTid)
  const bottomPanelVM = useInject<IBottomPanelVM>(IBottomPanelVMTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)

  const renderItem = ({ item }: ListRenderItemInfo<AvatarModel[]>) => {
    return <GroupedAvatars avatar={item} single />
  }

  const newMind = useCallback(() => {
    createMindVM.init()
    bottomPanelVM.openPanel(EBottomPanelContent.CreateMind)
  }, [bottomPanelVM, createMindVM])

  return (
    <>
      <View style={SS.headerContainer}>
        <View style={{ width: 20 }} />
        <Text style={SS.title}>{t.get('pick additional')}</Text>
        <Pressable style={SS.crossWrapper} onPress={bottomPanelVM.closePanel}>
          <Svg name={'Cross'} />
        </Pressable>
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
          <FlatList
            style={{ marginBottom: 25 }}
            data={appStore.commonAvatars}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
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
  crossWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
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
