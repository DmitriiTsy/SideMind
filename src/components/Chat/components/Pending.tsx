import React, { FC, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

export const Pending = observer(() => {
  return (
    <View style={SS.pendingContainer}>
      {Array.from({ length: 3 }, (_, index) => (
        <Dot index={index} key={index} />
      ))}
    </View>
  )
})

const Dot: FC<{ index: number }> = ({ index }) => {
  const position = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }]
  }))

  const moveToTop = useCallback(() => {
    position.value = withTiming(
      -3,
      {},
      (finished) => finished && runOnJS(moveToBottom)()
    )
  }, [position])

  const moveToBottom = useCallback(() => {
    position.value = withTiming(
      3,
      {},
      (finished) => finished && runOnJS(moveToTop)()
    )
  }, [position])

  useEffect(() => {
    setTimeout(() => {
      moveToTop()
    }, index * 100)
  }, [])

  return <Animated.View style={[SS.pendingDot, animatedStyle]} />
}

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
