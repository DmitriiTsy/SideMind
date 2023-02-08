import React, { FC, useCallback, useEffect } from 'react'
import {
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputContentSizeChangeEventData,
  View,
  ViewStyle
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import { observer } from 'mobx-react'

import { Svg } from 'components/ui/Svg'
import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { deviceWidth } from 'utils/dimentions'
import { IInputVM } from 'components/Input/Input.vm'

import { useRef } from 'react'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'
import { useState } from 'react'
const CLEAR_WIDTH = 83
const MIN_HEIGHT = 45

interface IInputProps {
  vm: IInputVM
  style?: StyleProp<ViewStyle>
}

export const Input: FC<IInputProps> = observer(({ vm, style }) => {
  const { value, label, placeholder, onChangeText, clear } = vm
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const [refIsActivated, setRefIsActivated] = useState()
  const height = useSharedValue(MIN_HEIGHT)
  const clearPosition = useSharedValue(
    refIsActivated ? -CLEAR_WIDTH : deviceWidth
  )

  const animatedCleanBttn = useAnimatedStyle(() => ({
    transform: [{ translateX: clearPosition.value }]
  }))

  useEffect(() => {
    clearPosition.value = withTiming(refIsActivated ? -18 : 0)
  }, [clearPosition, refIsActivated, value])

  useEffect(() => {
    label === createMindVM.inputName.label && handlePress()
  }, [createMindVM.inputName.label, label])

  const animatedHeight = useAnimatedStyle(() => ({
    height: height.value
  }))

  const onContentSizeChange = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      const h = e.nativeEvent.contentSize.height
      height.value = withTiming(h > MIN_HEIGHT ? h + 30 : MIN_HEIGHT)
    },
    [height]
  )
  const inputRef = useRef(null)

  const handlePress = () => {
    inputRef.current.focus()
  }

  const gotRefHandler = () => {
    setRefIsActivated(true)
  }

  const lostRefHandler = () => {
    setRefIsActivated(false)
  }

  const clearHandler = () => {
    setRefIsActivated(false)
    clear()
  }


  return (
    <Pressable style={[SS.container, style]} onPress={handlePress}>
      <Text style={SS.texts}>{t.get(label)}</Text>
      <Animated.View style={[SS.textInputWrapper, animatedHeight]}>
        <TextInput
          placeholder={t.get(placeholder)}
          placeholderTextColor="#989898"
          multiline={true}
          onFocus={gotRefHandler}
          onBlur={lostRefHandler}
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          onContentSizeChange={onContentSizeChange}
          style={[SS.textInput]}
          keyboardAppearance={'dark'}
          blurOnSubmit={true}
        />
        {refIsActivated && (
          <Animated.View
            style={[
              animatedCleanBttn,
              refIsActivated && { alignSelf: 'center' }
            ]}
          >
            <Pressable onPress={clearHandler}>
              <Svg name={'CleanTextInput'} />
            </Pressable>
          </Animated.View>
        )}
      </Animated.View>
    </Pressable>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 15,
    minHeight: 45,
    width: deviceWidth
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
    lineHeight: 16,
    fontWeight: '500',
    fontSize: 16,
    paddingHorizontal: 18
  }
})
