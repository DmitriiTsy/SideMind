import React, { useCallback, useState } from 'react'
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
import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'

const MIN_HEIGHT = 28

export const ChatInput = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const systemInfo = useInject<ISystemInfoService>(ISystemInfoServiceTid)
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

  return (
    <View style={[SS.container, inputHeight < 28 && SS.containerOnChange]}>
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
          onSubmitEditing={systemInfo.isTablet && submit}
          blurOnSubmit={true}
        />
      </View>
      <Svg
        name={value && !chatVM.pending ? 'EnterActive' : 'Enter'}
        onPress={submit}
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
    paddingHorizontal: 8,
    marginVertical: 4
  },
  containerOnChange: {
    alignItems: 'flex-end'
  }
})
