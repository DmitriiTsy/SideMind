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
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { Svg } from 'components/ui/Svg'
import { IStorageService, IStorageServiceTid } from 'services/StorageService'

export const SelectBotsHeader = observer(() => {
  const storage = useInject<IStorageService>(IStorageServiceTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const appStore = useInject<IAppStore>(IAppStoreTid)

  const { isStarting } = navigation.customParams

  const enabled = useMemo(
    () => appStore.selected.length === 3,
    [appStore.selected.length]
  )
  const addStarting = useCallback(() => {
    if (enabled) {
      storage.setUserLogin()
      appStore.setUsedBots()
      navigation.navigate(CommonScreenName.MainFeed)
    }
  }, [appStore, enabled, navigation, storage])

  const navigate = useCallback(() => {
    navigation.navigate(CommonScreenName.MainFeed)
  }, [navigation])

  return (
    <View style={SS.container}>
      <View style={{ marginRight: 60 }}>
        <Text style={SS.title}>
          {t.get(isStarting ? 'choose bots' : 'pick additional')}
        </Text>
        {isStarting && (
          <Text style={SS.counter}>{t.get('add more later')}</Text>
        )}
      </View>

      <Pressable
        style={SS.doneContainer}
        onPress={isStarting ? addStarting : navigate}
      >
        {isStarting ? (
          <Text style={[SS.activeText, !enabled && SS.inactiveText]}>
            {t.get('done')}
          </Text>
        ) : (
          <Svg name={'Cross'} style={{ marginRight: 14 }} />
        )}
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
