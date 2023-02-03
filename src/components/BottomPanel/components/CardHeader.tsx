import React, { useCallback } from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'
import { observer } from 'mobx-react'

import {
  IBottomPanelVM,
  IBottomPanelVMTid
} from 'components/BottomPanel/BottomPanel.vm'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

import { IContactCardVM, IContactCardVMTid } from '../ContactCard.vm'

export const CardHeader = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const vm = useInject<IContactCardVM>(IContactCardVMTid)
  const vmBottom = useInject<IBottomPanelVM>(IBottomPanelVMTid)

  const goBackHandler = useCallback(() => {
    vmBottom.toggle()
  }, [vmBottom])

  const onSubmitDataHandler = () => {
    vm.masterPromptHandler()
  }

  return (
    <View style={SS.container}>
      <Pressable onPress={goBackHandler}>
        <Text style={[SS.activeText, !vm.enabled && SS.inactiveText]}>
          {t.get('cancel')}
        </Text>
      </Pressable>
      <Text style={SS.text}>{t.get('mind info')}</Text>
      <Pressable onPress={onSubmitDataHandler} disabled={vm.pending}>
        <Text style={[SS.activeText, vm.pending && SS.inactiveText]}>
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
    backgroundColor: '#1C1C1E',
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
    fontWeight: '500',
    fontSize: 16,
    color: '#559EF8',
    lineHeight: 16,
    letterSpacing: -0.3
  },
  inactiveText: {
    color: '#484849',
    fontWeight: '700',
    fontSize: 16
  }
})
