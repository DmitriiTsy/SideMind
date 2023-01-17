import React, { useCallback, useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import {
  ILocalizationService,
  ILocalizationServiceTid,
  INavigationService,
  INavigationServiceTid
} from 'services'

import { CommonScreenName } from 'constants/screen.types'
import { ISelectAvatarsVM, ISelectAvatarsVMTid } from 'components/SelectAvatars'

export const SelectAvatarsHeader = observer(() => {
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const vm = useInject<ISelectAvatarsVM>(ISelectAvatarsVMTid)

  const enabled = useMemo(() => vm.selected.length === 3, [vm.selected.length])

  const addStarting = useCallback(() => {
    if (enabled) {
      vm.setAvatars()
      navigation.navigate(CommonScreenName.MainFeed)
    }
  }, [enabled, navigation, vm])

  return (
    <View style={SS.container}>
      <View style={{ width: 30, height: 1 }} />

      <View>
        <Text style={SS.title}>{t.get('choose bots')}</Text>
        <Text style={SS.counter}>{t.get('add more later')}</Text>
      </View>

      <Pressable style={SS.doneContainer} onPress={addStarting}>
        <Text style={[SS.activeText, !enabled && SS.inactiveText]}>
          {t.get('done')}
        </Text>
      </Pressable>
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#303030',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14
  },
  activeText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#559EF8'
  },
  inactiveText: {
    color: '#484849'
  },
  doneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120
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
