import React, { FC, useEffect } from 'react'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
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

interface IInputProps {
  vm: IInputVM
  style?: StyleProp<ViewStyle>
}

export const Input: FC<IInputProps> = observer(({ vm, style }) => {
  const {
    value,
    label,
    placeholder,
    onChangeText,
    clear,
    ref,
    onFocus,
    onBlur,
    autoFocus,
    isFocused,
    onSubmitEditing
  } = vm
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const clearPosition = useSharedValue(0)
  const animatedCleanBttn = useAnimatedStyle(() => ({
    transform: [{ translateX: clearPosition.value }]
  }))

  useEffect(() => {
    clearPosition.value = withTiming(value && isFocused ? -20 : 20)
  }, [clearPosition, isFocused, value])

  return (
    <View style={[SS.container, style]}>
      <Text style={SS.texts}>{t.get(label)}</Text>
      <View style={[SS.textInputWrapper]}>
        <TextInput
          placeholder={t.get(placeholder)}
          placeholderTextColor="#989898"
          multiline={true}
          ref={ref && ref}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
          style={[SS.textInput]}
          keyboardAppearance={'dark'}
          blurOnSubmit={true}
          onSubmitEditing={onSubmitEditing && onSubmitEditing}
        />
        <Animated.View style={[animatedCleanBttn]}>
          <Pressable onPress={clear} style={SS.svgContainer}>
            <Svg name={'CleanTextInput'} onPress={clear} />
          </Pressable>
        </Animated.View>
      </View>
    </View>
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
    lineHeight: 19,
    fontWeight: '400',
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
    color: '#FFFFFF',
    width: '100%',
    lineHeight: 16,
    fontWeight: '500',
    fontSize: 16,
    paddingHorizontal: 18,
    marginVertical: 12,
    textAlignVertical: 'center'
  },
  svgContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
