import React, { useMemo, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

import range from 'lodash/range'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
  withSpring
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
      const animationInterval = setInterval(() => {
        positions.forEach((position, index) => {
          position.value = withRepeat(
            withDelay(index * 200, withSpring(-7), 2, true)
          )
        })
        setTimeout(() => {
          positions.forEach((position, index) => {
            position.value = withRepeat(
              withDelay(index * 200, withSpring(7), 2, true)
            )
          })
        }, 500)
      }, 1000)
      return () => clearInterval(animationInterval)
    } else {
      positions.forEach((position, index) => {
        position.value = withSpring(
          withDelay(index * 200, withTiming(7), 2, true)
        )
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
