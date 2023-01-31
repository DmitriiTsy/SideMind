import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withDelay,
  withSpring
} from 'react-native-reanimated'

export const Pending = observer(() => {
  const positions = useRef<Animated.SharedValue<number>[]>([
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0)
  ]).current

  const animatedStyles = positions.map((position) =>
    useAnimatedStyle(() => {
      return {
        transform: [{ translateY: position.value }]
      }
    })
  )

  useEffect(() => {
    const animationInterval = setInterval(() => {
      positions.forEach((position, index) => {
        position.value = withRepeat(
          withDelay(index * 150, withSpring(-5)),
          2,
          true
        )
      })
      setTimeout(() => {
        positions.forEach((position, index) => {
          position.value = withRepeat(
            withDelay(index * 150, withSpring(5)),
            2,
            true
          )
        })
      }, 500)
    }, 1000)
    return () => clearInterval(animationInterval)
  }, [positions])

  return (
    <View style={SS.pendingContainer}>
      {Array.from({ length: 3 }, (_, index) => (
        <Animated.View
          key={index}
          style={[SS.pendingDot, animatedStyles[index]]}
        />
      ))}
    </View>
  )
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
