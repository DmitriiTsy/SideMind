import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'
import { EBottomPanelContent } from 'components/BottomPanel/types'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

export const CreateMindHeader = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  const bottomPanelVM = useInject<IBottomPanelVM>(IBottomPanelVMTid)

  const back = useCallback(() => {
    bottomPanelVM.openPanel(EBottomPanelContent.AddMind)
  }, [bottomPanelVM])

  return (
    <View style={SS.container}>
      <Pressable onPress={back}>
        <Text style={SS.activeText}>{t.get('cancel')}</Text>
      </Pressable>
      <Text style={SS.text}>{t.get('mind info')}</Text>
      <Pressable onPress={createMindVM.submit} disabled={createMindVM.pending}>
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
    paddingHorizontal: 24
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 16,
    letterSpacing: -0.3
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
