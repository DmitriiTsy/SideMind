import React from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'

import { Svg } from 'components/ui/Svg'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const Profile = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const AvatarChooseHandler = () => {
    console.log('')
  }

  return (
    <View style={SS.container}>
      <Pressable onPress={AvatarChooseHandler}>
        <Svg name={'AvatarEmpty'} />
      </Pressable>
      <Pressable style={SS.textsWrapper} onPress={AvatarChooseHandler}>
        <Text style={SS.texts}>{t.get('edit avatar')}</Text>
      </Pressable>
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14
  },
  textsWrapper: {
    paddingVertical: 16
  },
  texts: {
    fontWeight: '500',
    fontSize: 16,
    color: '#559EF8',
    lineHeight: 16,
    letterSpacing: -0.3
  }
})
