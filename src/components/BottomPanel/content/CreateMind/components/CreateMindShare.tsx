import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

export const CreateMindShare = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)

  const deleteMindHandler = () => {
    createMindVM.deleteMind()
  }

  return (
    <View style={SS.container}>
      <Pressable style={SS.wrapperShare}>
        <View>
          <Text style={SS.ShareText}>{t.get('share mind')}</Text>
        </View>
      </Pressable>
      <Pressable style={SS.wrapperDelete} onPress={deleteMindHandler}>
        <View>
          <Text style={SS.DeleteText}>{t.get('delete mind')}</Text>
        </View>
      </Pressable>
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 80,
    borderRadius: 12,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#303030',
    marginBottom: 21,
    marginHorizontal: 18
  },
  wrapperShare: {
    borderBottomColor: '#444444',
    borderBottomWidth: 0.5,
    width: '100%',
    paddingBottom: 12,
    paddingHorizontal: 18
  },
  wrapperDelete: {
    paddingHorizontal: 18
  },
  ShareText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#549EF7',
    lineHeight: 16
  },
  DeleteText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#EB5545',
    lineHeight: 16
  }
})
