import React, { useCallback } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'
import { EBottomPanelContent } from 'components/BottomPanel/types'
import {
  IContactCardVM,
  IContactCardVMTid
} from 'components/BottomPanel/content'

export const CardHeader = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const vm = useInject<IContactCardVM>(IContactCardVMTid)
  const vmBottom = useInject<IBottomPanelVM>(IBottomPanelVMTid)
  const goBackHandler = useCallback(() => {
    vmBottom.openPanel(EBottomPanelContent.AddMind)
  }, [vmBottom])

  const onSubmitDataHandler = () => {
    if (vm.FullName !== undefined && vm.FullName.length < 5) {
      Alert.alert('Name must have at least 5 characters')
    } else if (vm.Tagline !== undefined && vm.Tagline.length < 5) {
      Alert.alert('Tagline must have at least 5 characters')
    } else if (vm.FullName !== undefined && vm.Bio.length < 15) {
      Alert.alert('Bio must have at least 15 characters')
    } else {
      vm.masterPromptHandler()
    }
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
        <Text style={[SS.inactiveText, vm.requirementFields && SS.activeText]}>
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
