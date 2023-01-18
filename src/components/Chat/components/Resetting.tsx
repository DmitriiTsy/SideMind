import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

import { observer } from 'mobx-react'

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

export const Resetting = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const [second, setSecond] = useState(3)

  const cancel = useCallback(() => {
    setSecond(3)
    chatVM.changeResetState(false)
  }, [chatVM])

  const state = useSharedValue(0)

  useEffect(() => {
    if (chatVM.resetting) setSecond(3)
  }, [chatVM.resetting])

  useEffect(() => {
    setTimeout(() => {
      if (chatVM.resetting) {
        if (second === 1) {
          cancel()
          chatVM.resetMessages()
        }
        setSecond(second - 1)
      }
    }, 1000)
  }, [cancel, chatVM, chatVM.resetting, second])

  useEffect(() => {
    state.value = withRepeat(withTiming(1, { duration: 500 }), -1, true)
  }, [])

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        state.value,
        [0, 1],
        ['#363637', '#36363780']
      )
    }),
    []
  )

  if (!chatVM.resetting) {
    return null
  }

  return (
    <Animated.View style={[SS.container, animatedStyle]}>
      <Text style={[SS.title, SS.text]}>{`${t.get(
        'resetting'
      )} ${second}...`}</Text>
      <Pressable onPress={cancel}>
        <Text style={[SS.cancel, SS.text]}>{t.get('cancel')}</Text>
      </Pressable>
    </Animated.View>
  )
})

const SS = StyleSheet.create({
  container: {
    height: 44,
    marginBottom: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    marginHorizontal: 12,
    fontWeight: '500',
    fontSize: 16
  },
  title: {
    color: '#FFFFFF66'
  },
  cancel: {
    color: '#FFFFFF'
  }
})
