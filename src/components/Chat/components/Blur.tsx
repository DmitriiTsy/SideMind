import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native'

import Clipboard from '@react-native-clipboard/clipboard'
import { BlurView } from '@react-native-community/blur'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import { Svg } from 'components/ui/Svg'
import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { deviceWidth } from 'utils/dimentions'

export const Blur = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const [copyOnPressColorToggle, setCopyOnPressColorToggle] = useState(false)
  const height = useMemo(() => chatVM.coordinate * 0.8, [chatVM.coordinate])
  const position = useSharedValue(height * 0.3)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }]
  }))

  useEffect(() => {
    if (chatVM.blur) {
      position.value = withTiming(0, {
        duration: 700,
        easing: Easing.out(Easing.exp)
      })
    } else {
      position.value = withTiming(height * 0.9)
    }
  }, [chatVM.blur, height, position])

  const blurToggleOff = useCallback(() => {
    position.value = withTiming(height * 0.2, {
      duration: 500,
      easing: Easing.out(Easing.exp)
    })
    setTimeout(() => {
      chatVM.blurToggle()
    }, 250)
  }, [chatVM, height, position])

  const copyButtonColorHandler = () => {
    copyOnPressColorToggle === false
      ? setCopyOnPressColorToggle(true)
      : setCopyOnPressColorToggle(false)
  }

  const clipboardToggle = useCallback(() => {
    position.value = withTiming(150, {
      duration: 500,
      easing: Easing.out(Easing.exp)
    })
    Clipboard.setString(chatVM.blurMessage)
    chatVM.blurToggle()
  }, [chatVM, position])

  // style={[
  //   SS.blurWrapper,
  //   { top: coordinateY * 0.9 },
  //   chatVM.isBot ? SS.blurWrapperBot : SS.blurWrapperHuman
  // ]}
  return (
    <Pressable onPress={blurToggleOff} style={SS.blurViewBot}>
      <View style={SS.blurViewBot}>
        <BlurView
          style={[chatVM.isBot ? SS.blurViewBot : SS.blurViewHuman]}
          blurType="dark"
          blurAmount={6}
          reducedTransparencyFallbackColor="white"
          blurRadius={25}
        >
          <Animated.View
            style={[
              SS.blurWrapper,
              {
                top: height
              },
              chatVM.isBot ? SS.blurWrapperBot : SS.blurWrapperHuman,
              animatedStyle
            ]}
          >
            <View
              style={[
                chatVM.isBot
                  ? SS.blurContainerTextBot
                  : SS.blurContainerTextHuman
              ]}
            >
              <Text style={SS.blurText}>{chatVM.blurMessage}</Text>
            </View>
            <Pressable
              onPress={clipboardToggle}
              onPressIn={copyButtonColorHandler}
            >
              <View
                style={[
                  SS.containerCopy,
                  copyOnPressColorToggle
                    ? { backgroundColor: '#707070' }
                    : { backgroundColor: '#363637' }
                ]}
              >
                <Text style={SS.copyText}>{t.get('copy')}</Text>
                <Svg name={'Copy'} />
              </View>
            </Pressable>
          </Animated.View>
        </BlurView>
      </View>
    </Pressable>
  )
}

const SS = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#000000',
    justifyContent: 'space-between'
  },
  containerCopy: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 83,
    height: 38,
    borderRadius: 25,
    padding: 9,
    backgroundColor: '#363637',
    marginTop: 6,
    fontSize: 16,
    marginRight: 12
  },
  copyText: {
    marginRight: 12,
    fontWeight: '500',
    fontSize: 16,
    color: '#FFF'
  },
  blurViewHuman: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'flex-end'
  },
  blurWrapper: {
    position: 'absolute',
    flexDirection: 'column',
    marginLeft: 12
  },
  blurContainerTextBot: {
    padding: 9,
    marginTop: 3,
    borderRadius: 12,
    backgroundColor: '#363637',
    borderBottomLeftRadius: 2,
    maxWidth: deviceWidth * 0.85
  },
  blurContainerTextHuman: {
    padding: 9,
    marginTop: 3,
    borderRadius: 12,
    backgroundColor: '#549EF7',
    borderBottomRightRadius: 2,
    alignItems: 'flex-end',
    maxWidth: deviceWidth * 0.65,
    marginRight: 12
  },
  blurText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#FFF'
  },
  blurViewBot: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  blurWrapperBot: {
    alignItems: 'flex-start'
  },
  blurWrapperHuman: {
    alignItems: 'flex-end'
  },
  resetContainer: { marginRight: 19 }
})
