import React, { useEffect, useMemo } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { observer } from 'mobx-react'

import { deviceHeight, deviceWidth } from 'utils/dimentions'
import { useInject } from 'IoC'
import {
  ILayoutService,
  ILayoutServiceTid,
  ILocalizationService,
  ILocalizationServiceTid
} from 'services'
import {
  IBottomPanelVM,
  IBottomPanelVMTid
} from 'components/BottomPanel/BottomPanel.vm'
import { Svg } from 'components/ui/Svg'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { AvatarModel } from 'services/FirebaseService/types'
import { SkeletonAvatars } from 'components/SelectAvatars/components/skeleton/Skeleton'
import { GroupedAvatars } from 'components/SelectAvatars/components/GroupedAvatars'

export const BottomPanel = observer(() => {
  const layoutService = useInject<ILayoutService>(ILayoutServiceTid)
  const appStore = useInject<IAppStore>(IAppStoreTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const vm = useInject<IBottomPanelVM>(IBottomPanelVMTid)
  const height = useMemo(
    () =>
      deviceHeight - (layoutService.insets.top + layoutService.statusBarHeight),
    [layoutService.insets.top, layoutService.statusBarHeight]
  )

  const position = useSharedValue(height)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }]
  }))

  useEffect(() => {
    if (vm.opened) {
      position.value = withTiming(0)
    } else {
      position.value = withTiming(height)
    }
  }, [height, position, vm.opened])

  const renderItem = ({ item }: ListRenderItemInfo<AvatarModel[]>) => {
    return <GroupedAvatars avatar={item} single />
  }

  return (
    <Animated.View
      style={[
        SS.container,
        {
          height
        },
        animatedStyle
      ]}
    >
      <View style={SS.headerContainer}>
        <View style={{ width: 20 }} />
        <Text style={SS.title}>{t.get('pick additional')}</Text>
        <Svg name={'Cross'} onPress={vm.toggle} />
      </View>
      {appStore.commonAvatars.length === 0 ? (
        <SkeletonAvatars />
      ) : (
        <FlatList data={appStore.commonAvatars} renderItem={renderItem} />
      )}
    </Animated.View>
  )
})

const SS = StyleSheet.create({
  container: {
    width: deviceWidth,
    position: 'absolute',
    backgroundColor: '#1C1C1E',
    zIndex: 0,
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
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
  }
})
