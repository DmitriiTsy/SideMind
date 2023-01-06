import React, { useMemo, useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

import { CommonScreenName } from 'constants/screen.types'
import { INavigationService, INavigationServiceTid } from 'services'
import { IAppStore, IAppStoreTid } from 'store/AppStore'

export const SelectBotsHeader = observer(() => {
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const appStore = useInject<IAppStore>(IAppStoreTid)

  const enabled = useMemo(
    () => appStore.selected.length === 3,
    [appStore.selected.length]
  )
  const onPress = useCallback(() => {
    if (enabled) {
      appStore.setUsedBots()
      navigation.navigate(CommonScreenName.MainFeed)
    }
  }, [appStore, enabled, navigation])

  return (
    <View style={SS.container}>
      <View style={{ marginRight: 60 }}>
        <Text style={SS.title}>{t.get('choose bots')}</Text>
        <Text style={SS.counter}>{t.get('add more later')}</Text>
      </View>

      <Pressable style={SS.doneContainer} onPress={onPress}>
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
    justifyContent: 'flex-end'
  },
  activeText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#559EF8',
    marginHorizontal: 18
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
