import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'

import { observer } from 'mobx-react'

import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const LoadingHeader = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  return (
    <View style={SS.container}>
      <View style={SS.containerTexts}>
        <Text style={SS.titleNewChat}>{t.get('load new chat')}</Text>
        <Text style={SS.titleDone}>{t.get('done')}</Text>
      </View>
      <Text style={SS.counter}>{t.get('loading ais')}</Text>
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 52,
    backgroundColor: '#303030',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  containerTexts: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  titleNewChat: {
    textAlign: 'center'
  },
  titleDone: {
    textAlign: 'right',
    position: 'absolute',
    right: 18
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  counter: {
    fontWeight: '400',
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center'
  }
})
