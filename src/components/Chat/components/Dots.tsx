import React, { useMemo, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

import range from 'lodash/range'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  sequence,
  withDelay
} from 'react-native-reanimated'

import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

export const Dots = observer(() => {
  const chatVM = useInject<IChatVM>(IChatVMTid)

  const positions = useRef<Animated.SharedValue<number>[]>([
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0)
  ]).current

  const animatedStyles = positions.map((position) => useAnimatedStyle(() => {
      return {
        transform: [{ translateY: position.value }]
      }
    })
  )
  useEffect(() => {
    if (chatVM.pending) {
      setTimeout(() => {
        positions.forEach((position, index) => {
          position.value = withRepeat(
            withDelay(index * 50, withTiming(15), 2, true)
          )
        })
        setTimeout(() => {
            positions.forEach((position) => {
              position.value = 0;
            });
          }, 600)
      }, 750)
    } else {
      positions.forEach((position, index) => {
        position.value = withTiming(40, { duration: index * 50 })
      })
    }
  }, [chatVM.pending, positions])

  const Pending = () =>
    chatVM.pending ? (
      <View style={SS.pendingContainer}>
        {Array.from({ length: 3 }, (_, index) => (
          <Animated.View
            key={index}
            style={[SS.pendingDot, animatedStyles[index]]}
          />
        ))}
      </View>
    ) : (
      <></>
    )
  return <Pending />
})

const SS = StyleSheet.create({
  flatList: {
    flex: 1
  },
  pendingContainer: {
    height: 38,
    width: 40,
    backgroundColor: '#363637',
    marginLeft: 14,
    marginVertical: 12,
    borderRadius: 12,
    borderBottomLeftRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pendingDot: {
    height: 5,
    width: 5,
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 7
  }
})
