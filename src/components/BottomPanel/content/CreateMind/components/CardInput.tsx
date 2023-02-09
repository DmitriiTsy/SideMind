import React, { FC, useCallback, useEffect } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  Pressable
} from 'react-native'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import { observer } from 'mobx-react'

import { useInject } from 'IoC'

import { deviceWidth } from 'utils/dimentions'

import { Svg } from 'components/ui/Svg'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { ICreateMindInput } from 'components/BottomPanel/content/CreateMind/types'

const CLEAR_WIDTH = 83
const MIN_HEIGHT = 45

interface ICardInputProps {
  input: ICreateMindInput
}

export const CardInput: FC<ICardInputProps> = observer(({ input }) => {
  const { label, placeholder, value, type } = input
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  const height = useSharedValue(MIN_HEIGHT)
  const clearPosition = useSharedValue(value ? -CLEAR_WIDTH : deviceWidth)

  const animatedCleanBttn = useAnimatedStyle(() => ({
    transform: [{ translateX: clearPosition.value }]
  }))

  useEffect(() => {
    clearPosition.value = withTiming(value ? -18 : 0)
  }, [clearPosition, value, createMindVM])

  const onChangeText = useCallback(
    (text: string) => {
      createMindVM.onChangeText(text, type)
    },
    [createMindVM, type]
  )

  const onContentSizeChange = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      const h = e.nativeEvent.contentSize.height
      height.value = withTiming(h > MIN_HEIGHT ? h + 30 : MIN_HEIGHT)
    },
    [height]
  )

  const clean = useCallback(() => {
    createMindVM.clean(type)
  }, [createMindVM, type])

  const animatedHeight = useAnimatedStyle(() => ({
    height: height.value
  }))

  return (
    <View style={SS.container}>
      <Text style={SS.texts}>{t.get(label)}</Text>
      <Animated.View style={[SS.textInputWrapper, animatedHeight]}>
        <TextInput
          placeholder={t.get(placeholder)}
          placeholderTextColor="#989898"
          multiline={true}
          value={value}
          onChangeText={onChangeText}
          onContentSizeChange={onContentSizeChange}
          style={[SS.textInput]}
          keyboardAppearance={'dark'}
          blurOnSubmit={true}
        />
        {value && (
          <Animated.View
            style={[animatedCleanBttn, value && { alignSelf: 'flex-start', paddingTop: 14, paddingLeft: 4 }]}
          >
            <Pressable onPress={clean}>
              <Svg name={'CleanTextInput'} />
            </Pressable>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 15
  },
  texts: {
    textAlign: 'left',
    color: '#989898',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '500',
    marginBottom: 8,
    paddingHorizontal: 18
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18,
    backgroundColor: '#2C2C2D'
  },
  textInput: {
    backgroundColor: '#2C2C2D',
    color: '#FFFFFF',
    width: '100%',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '400',
    paddingHorizontal: 18
  }
})
