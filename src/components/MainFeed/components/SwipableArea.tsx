import React, { Ref, useCallback } from 'react'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  ScrollView
} from 'react-native-gesture-handler'
import { Pressable, StyleSheet, Text } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import { deviceWidth } from 'utils/dimentions'

const TRANSLATE_X_THRESHOLD = -deviceWidth * 0.5
const DEFAULT_HEIGHT = 77

export const SwipeableArea = ({
  simultaneousHandlers,
  action,
  children
}: {
  simultaneousHandlers: Ref<ScrollView>
  action: () => void
  children: JSX.Element
}) => {
  const xPosition = useSharedValue(0)
  const height = useSharedValue(DEFAULT_HEIGHT)

  const removeItem = useCallback(() => {
    xPosition.value = withTiming(-deviceWidth)
    height.value = withTiming(0, undefined, (finished) => {
      finished && runOnJS(action)()
    })
  }, [action, height, xPosition])

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (e, ctx) => {
      ctx.x = xPosition.value
    },
    onActive: (e, ctx) => {
      if (e.translationX + ctx.x > 0) {
        xPosition.value = 0
      } else {
        xPosition.value = e.translationX + ctx.x
      }
    },
    onEnd: () => {
      if (xPosition.value < TRANSLATE_X_THRESHOLD) {
        runOnJS(removeItem)()
      } else if (xPosition.value < -95) {
        xPosition.value = withTiming(-95)
      } else {
        xPosition.value = withTiming(0)
      }
    }
  })

  const uaStyleTranslate = useAnimatedStyle(() => ({
    transform: [{ translateX: xPosition.value }]
  }))

  const uaStyleHeight = useAnimatedStyle(() => ({
    height: height.value
  }))

  return (
    <Animated.View style={[uaStyleHeight]}>
      <Pressable style={[SS.deleteArea]} onPress={removeItem}>
        <Text style={SS.deleteText} numberOfLines={1}>
          Delete
        </Text>
      </Pressable>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={onGestureEvent}
        activeOffsetX={[-10, 10]}
        failOffsetY={[-5, 5]}
      >
        <Animated.View style={uaStyleTranslate}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

const SS = StyleSheet.create({
  deleteArea: {
    backgroundColor: 'red',
    position: 'absolute',
    right: 0,
    height: 77,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%'
  },
  deleteText: { right: 20, color: 'white', fontWeight: '500', fontSize: 18 }
})
