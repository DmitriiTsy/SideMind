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

const MIN_HEIGHT = 28

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
    setInputHeight(height > MIN_HEIGHT ? height + 10 : MIN_HEIGHT)
  }

  const submit = () => {
    chatVM.sendMessage(value)
    setValue('')
  }

  return (
    <View style={SS.container}>
      <View style={[SS.inputContainer]}>
        <TextInput
          multiline={true}
          placeholder={t.get('start message')}
          placeholderTextColor={'#FFF'}
          value={value}
          onChangeText={onChangeText}
          onContentSizeChange={onContentSizeChange}
          style={[SS.input, { height: inputHeight }]}
        />
      </View>
      <Svg name={'Enter'} style={{ marginVertical: 6 }} onPress={submit} />
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
  inputContainer: {
    backgroundColor: '#222222',
    borderRadius: 12,
    marginVertical: 6,
    marginRight: 8
  },
  input: {
    color: '#FFF',
    width: deviceWidth * 0.8,
    padding: 5
  }
})
