import React, { useCallback, useMemo, useState } from 'react'
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
    setInputHeight(height > MIN_HEIGHT ? height + 15 : MIN_HEIGHT)
  }

  const submit = useCallback(() => {
    if (!chatVM.pending && value) {
      chatVM.sendMessage(value)
      setValue('')
    }
  }, [chatVM, value])

  const isMultiline = useMemo(() => inputHeight > 28, [inputHeight])

  return (
    <View style={[SS.container, isMultiline && SS.containerOnChange]}>
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
        />
      </View>
      <Svg
        style={SS.inputButtonContainer}
        name={value && !chatVM.pending ? 'EnterActive' : 'Enter'}
        onPress={submit}
        style={isMultiline && SS.enter}
        size={32}
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
    marginBottom: 6
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
    paddingHorizontal: 8,
    marginVertical: 4
  },
  containerOnChange: {
    alignItems: 'flex-end'
  }
})
