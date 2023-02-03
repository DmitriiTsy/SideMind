import React, { FC, useEffect, useState } from 'react'
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

import { useInject } from 'IoC'

import { deviceWidth } from 'utils/dimentions'

import { Svg } from 'components/ui/Svg'
import {
  IContactCardVM,
  IContactCardVMTid
} from 'components/BottomPanel/content'

const CLEAR_WIDTH = 83
const MIN_HEIGHT = 45

interface ICardInputProps {
  hint: any //todo
  placeholder: any //todo
}

export const CardInput: FC<ICardInputProps> = ({ hint, placeholder }) => {
  const vm = useInject<IContactCardVM>(IContactCardVMTid)
  const [value, setValue] = useState('')
  const [inputHeight, setInputHeight] = useState(MIN_HEIGHT)
  const clearPosition = useSharedValue(value ? -CLEAR_WIDTH : deviceWidth)

  const animatedColor = useAnimatedStyle(() => ({
    transform: [{ translateX: clearPosition.value }]
  }))

  useEffect(() => {
    clearPosition.value = withTiming(value ? -18 : 0)
  }, [clearPosition, value, vm])

  const onChangeText = (text: string) => {
    setValue(text)
    vm.toggle(placeholder, value)
  }

  const onContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const { height } = e.nativeEvent.contentSize
    setInputHeight(height > MIN_HEIGHT ? height + 15 : MIN_HEIGHT)
  }

  const InputCleanHandler = () => {
    setValue('')
    vm.clean(placeholder)
  }

  return (
    <View style={SS.container}>
      <Text style={SS.texts}>{hint}</Text>
      <View style={SS.textInputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#989898"
          multiline={true}
          value={value}
          onChangeText={onChangeText}
          onContentSizeChange={onContentSizeChange}
          style={[SS.textInput, { height: inputHeight }]}
          keyboardAppearance={'dark'}
          blurOnSubmit={true}
        ></TextInput>
        {value && (
          <Animated.View
            style={[animatedColor, value && { alignSelf: 'center' }]}
          >
            <Pressable onPress={InputCleanHandler}>
              <Svg name={'CleanTextInput'} />
            </Pressable>
          </Animated.View>
        )}
      </View>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 90,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%'
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
    paddingTop: 15,
    backgroundColor: '#2C2C2D',
    color: '#FFFFFF',
    width: '100%',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '400',
    paddingHorizontal: 18
  }
})
