import React, { useState } from 'react'
import {
  Pressable,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

import { Svg } from 'components/ui/Svg'

export const ChatBottom = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <View style={SS.container}>
      <ScrollView></ScrollView>
      <Pressable>
        <KeyboardAvoidingView
          keyboardVerticalOffset={160}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            keyboardAppearance="dark"
            placeholder="Start message"
            placeholderTextColor="grey"
            fontStyle="italic"
            style={SS.container_text}
          />
        </KeyboardAvoidingView>
      </Pressable>
      <Pressable style={SS.wrapper_enter}>
        <Svg name={'Enter'} />
      </Pressable>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 0.5,
    borderColor: '#333333',
    paddingLeft: 14,
    paddingRight: 8
  },
  wrapper_thread: {
    height: 200
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: 'grey',
    textAlign: 'center'
  },
  container_text: {
    marginTop: 6,
    height: 28,
    width: 317,
    backgroundColor: '#222222',
    borderRadius: 12,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    marginRight: 8
  },
  wrapper_enter: {
    marginTop: 6
  }
})
