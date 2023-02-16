import React, { useCallback, useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

import { useInject } from 'IoC'
import { Svg } from 'components/ui/Svg'
import { deviceWidth } from 'utils/dimentions'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

export const ChatInput = () => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const [value, setValue] = useState('')

  const onChangeText = (text: string) => {
    setValue(text)
  }

  const submit = useCallback(() => {
    if (!chatVM.pending && value) {
      chatVM.sendMessage(value)
      setValue('')
    }
  }, [chatVM, value])

  return (
    <View style={[SS.container, SS.containerOnChange]}>
      <View style={[SS.inputContainer]}>
        <TextInput
          multiline={true}
          value={value}
          onChangeText={onChangeText}
          style={SS.input}
          keyboardAppearance={'dark'}
        />
      </View>
      <Svg
        name={value && !chatVM.pending ? 'EnterActive' : 'Enter'}
        onPress={submit}
        style={SS.enter}
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
    marginBottom: 10
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
    marginTop: 6,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
    textAlignVertical: 'center'
  },
  containerOnChange: {
    alignItems: 'flex-end'
  }
})
