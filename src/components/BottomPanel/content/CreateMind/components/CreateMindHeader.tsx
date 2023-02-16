import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

export const CreateMindHeader = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)

  return (
    <View style={SS.container}>
      <Pressable style={SS.activeTextWrapper} onPress={createMindVM.goBack}>
        <Text style={SS.activeText}>{t.get('cancel')}</Text>
      </Pressable>
      <Text style={SS.text}>{t.get('mind info')}</Text>
      <Pressable
        onPress={createMindVM.submit}
        disabled={createMindVM.pending}
        style={SS.activeTextWrapper}
      >
        <Text style={createMindVM.hasError ? SS.inactiveText : SS.activeText}>
          {t.get('save')}
        </Text>
      </Pressable>
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#303030',
    marginBottom: 12
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 16,
    letterSpacing: -0.3
  },
  activeTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36
  },
  activeText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#559EF8',
    lineHeight: 16
  },
  inactiveText: {
    color: '#484849',
    fontWeight: '700',
    fontSize: 16
  }
})
