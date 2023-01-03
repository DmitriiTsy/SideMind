import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { useInject } from 'IoC'
import {
  ILocalizationServiceVM,
  ILocalizationServiceVMTid
} from 'services/LocalizationService/LocalizationService'

import { Svg } from 'components/ui/Svg'

export const InChatPreview = () => {
  const t = useInject<ILocalizationServiceVM>(ILocalizationServiceVMTid)

  return (
    <TouchableOpacity>
      <View style={SS.container}>
        <View style={SS.container_avatar}>
          <Svg name={'AvatarInChat'} style={SS.container_avatar_source} />
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
        </View>
      </View>
    </TouchableOpacity>
  )
}

const SS = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    width: '100%',
    height: 77,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 18,
    paddingTop: 12
  },
  container_right: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#333333',
    height: '100%'
  },
  container_avatar: {
    marginRight: 14,
    borderRadius: 25,
    height: '100%'
  },
  container_avatar_source: {
    borderRadius: 25
  },
  text_wrapper: {},
  text_wrapper_header: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    alignItems: 'flex-end',
    letterSpacing: 0.4
  },
  text_wrapper_description: {
    color: '#7D7D82',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0.4
  }
})
