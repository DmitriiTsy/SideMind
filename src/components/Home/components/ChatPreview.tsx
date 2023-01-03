import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { useInject } from 'IoC'
import {
  ILocalizationServiceVM,
  ILocalizationServiceVMTid
} from 'services/LocalizationService/LocalizationService'

import { Svg } from 'components/ui/Svg'

export const ChatPreview = () => {
  const [ChoosenChat, setChoosenChat] = useState(false)
  const t = useInject<ILocalizationServiceVM>(ILocalizationServiceVMTid)

  const ChoosenChatHandler = () =>
    ChoosenChat ? setChoosenChat(false) : setChoosenChat(true)

  const ChoosenChatStylesHandler = () => {
    return !ChoosenChat ? (
      <View style={SS.empty}></View>
    ) : (
      <View style={SS.filled}>
        <Svg name={'Check'} style={SS.filled_source} />
      </View>
    )
  }
  return (
    <TouchableOpacity onPress={ChoosenChatHandler}>
      <View style={SS.container}>
        <View style={SS.container_avatar}>
          <Svg name={'Avatar'} style={SS.container_avatar_source} />
        </View>
        <View style={SS.container_right}>
          <View style={SS.text_wrapper}>
            <Text style={SS.text_wrapper_header}>
              {t.get('chat_preview_header')}
            </Text>
            <Text style={SS.text_wrapper_description}>
              {t.get('chat_preview_text')}
            </Text>
          </View>
          <ChoosenChatStylesHandler />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const SS = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1D',
    width: '100%',
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 18
  },
  container_right: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#333333',
    height: '100%'
  },
  container_avatar: {
    marginRight: 12,
    borderRadius: 250
  },
  container_avatar_source: {},
  text_wrapper: {},
  text_wrapper_header: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    alignItems: 'flex-end',
    letterSpacing: -0.2
  },
  text_wrapper_description: {
    color: '#98989E',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.2
  },
  empty: {
    width: 20,
    height: 20,
    borderRadius: 250,
    backgroundColor: '#1C1C1D',
    borderWidth: 1,
    borderColor: '#484849',
    marginRight: 18
  },
  filled: {
    width: 20,
    height: 20,
    borderRadius: 250,
    backgroundColor: '#1C1C1D',
    marginRight: 18
  },
  filled_source: {
    borderRadius: 250,
    borderWidth: 1,
    borderColor: '#484849',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
