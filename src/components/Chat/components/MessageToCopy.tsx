import React, { FC, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import Clipboard from '@react-native-clipboard/clipboard'

import { deviceWidth } from 'utils/dimentions'
import { Svg } from 'components/ui/Svg'
import { useInject } from 'IoC'
import { IBlurVM, IBlurVMTid } from 'components/Blur'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

interface IProps {
  positionY: number
  isBot: boolean
  text: string
}

const COPY_WIDTH = 83

export const MessageToCopy: FC<IProps> = ({ positionY, isBot, text }) => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const blurVM = useInject<IBlurVM>(IBlurVMTid)
  const position = useSharedValue(positionY)
  const color = useSharedValue('#363637')
  const copyPosition = useSharedValue(isBot ? -COPY_WIDTH : deviceWidth)

  const animatedPosition = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }]
  }))
  const animatedColor = useAnimatedStyle(() => ({
    backgroundColor: color.value,
    transform: [{ translateX: copyPosition.value }]
  }))

  const close = async (): Promise<void> =>
    new Promise((resolve) => {
      copyPosition.value = withTiming(isBot ? -COPY_WIDTH : deviceWidth, {
        duration: 100
      })
      position.value = withTiming(positionY - 10, {}, () => runOnJS(resolve)())
    })

  useEffect(() => {
    blurVM.onClose = close
  }, [])

  useEffect(() => {
    copyPosition.value = withTiming(isBot ? 10 : -10)
    position.value = withTiming(position.value * 0.85, {
      duration: 500,
      easing: Easing.out(Easing.exp)
    })
  }, [copyPosition, isBot, position, positionY])

  const copy = () => {
    Clipboard.setString(text)
    blurVM.hide()
  }

  const changeColor = (active: boolean) => () => {
    color.value = withTiming(active ? '#707070' : '#363637')
  }

  return (
    <View style={[SS.container, !isBot && SS.fromHuman]}>
      <Animated.View style={animatedPosition}>
        <View style={isBot ? SS.botMessage : SS.humanMessage}>
          <Text style={SS.text}>{text}</Text>
        </View>

        <Animated.View
          style={[
            SS.containerCopy,
            animatedColor,
            !isBot && { alignSelf: 'flex-end' }
          ]}
        >
          <Pressable
            onPress={copy}
            onPressIn={changeColor(true)}
            onPressOut={changeColor(false)}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <Text style={SS.text}>{t.get('copy')}</Text>
            <Svg name={'Copy'} />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flex: 1
  },
  fromHuman: {
    alignItems: 'flex-end'
  },
  botMessage: {
    padding: 9,
    marginTop: 3,
    borderRadius: 12,
    backgroundColor: '#363637',
    borderBottomLeftRadius: 2,
    maxWidth: deviceWidth * 0.85,
    marginLeft: 12
  },
  humanMessage: {
    padding: 9,
    marginTop: 3,
    borderRadius: 12,
    backgroundColor: '#549EF7',
    borderBottomRightRadius: 2,
    maxWidth: deviceWidth * 0.65,
    marginRight: 12
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    color: '#FFF'
  },
  containerCopy: {
    width: 83,
    height: 38,
    borderRadius: 25,
    marginTop: 6
  }
})
