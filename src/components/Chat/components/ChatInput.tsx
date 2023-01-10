import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData
} from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

import { Svg } from 'components/ui/Svg'
import { deviceWidth } from 'utils/dimentions'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

const MIN_HEIGHT = 36

export const ChatInput = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const chatVM = useInject<IChatVM>(IChatVMTid)
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

  const submit = () => {
    if (value) {
      chatVM.sendMessage(value)
      setValue('')
    }
  }

  return (
    <View style={inputHeight < 36 ? SS.container : SS.containerOnChange}>
      <View style={[SS.inputContainer]}>
        <TextInput
          multiline={true}
          placeholder={t.get('start message')}
          placeholderTextColor={'#FFF'}
          value={value}
          onChangeText={onChangeText}
          onContentSizeChange={onContentSizeChange}
          style={[SS.input, { height: inputHeight }]}
          keyboardAppearance={'dark'}
          // textAlignVertical={'bottom'}
        />
      </View>
      <Svg
        name={value ? 'EnterActive' : 'Enter'}
        style={SS.enter}
        onPress={submit}
      />
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: '#333333'
  },
  enter: {
    width: 36,
    height: 36
  },
  inputContainer: {
    backgroundColor: '#222222',
    borderRadius: 12,
    marginVertical: 6,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    color: '#FFF',
    width: deviceWidth * 0.85,
    paddingHorizontal: 8
  },
  containerOnChange: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopWidth: 0.5,
    borderColor: '#333333'
  }
})
