import React, { useEffect, useMemo } from 'react'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native'

import { observer } from 'mobx-react'

import { deviceHeight, deviceWidth } from 'utils/dimentions'
import { useInject } from 'IoC'
import { ILayoutService, ILayoutServiceTid } from 'services'
import {
  IBottomPanelVM,
  IBottomPanelVMTid
} from 'components/BottomPanel/BottomPanel.vm'

export const BottomPanel = observer(() => {
  const layoutService = useInject<ILayoutService>(ILayoutServiceTid)
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
    if (vm.content && !vm.closing) {
      position.value = withTiming(0)
    } else {
      const clear = () => {
        vm.content = null
        vm.closing = false
      }
      position.value = withTiming(
        height,
        {},
        (finished) => finished && runOnJS(clear)()
      )
    }
  }, [height, position, vm, vm.closing, vm.content])

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
      {vm.content}
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
  }
})
