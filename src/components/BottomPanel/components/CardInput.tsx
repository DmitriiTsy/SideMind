import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData
} from 'react-native'

import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
  } from 'react-native-reanimated'

import { Svg } from 'components/ui/Svg'

const MIN_HEIGHT = 45
export const CardInput = (props: { hint: any; placeholder: any }) => {
  const hints = props.hint
  const placeholder = props.placeholder
  const [value, setValue] = useState('')
  const [inputHeight, setInputHeight] = useState(MIN_HEIGHT)

  const onChangeText = (text: string) => {
    setValue(text)
  }

  const onContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const { height } = e.nativeEvent.contentSize
    setInputHeight(height > MIN_HEIGHT ? height + 15 : MIN_HEIGHT)
  }

  return (
    <View style={SS.container}>
      <Text style={SS.texts}>{hints}</Text>
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
          <View>
            <Svg name={'CleanTextInput'} />
          </View>
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
    paddingRight: 36,
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
