import React, { FC, useCallback } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

import { observer } from 'mobx-react'

import { Svg } from 'components/ui/Svg'

import { BotModel } from 'services/FirebaseService/types'
import { useInject } from 'IoC'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { deviceWidth } from 'utils/dimentions'

interface IBotProps {
  bot: BotModel
}

export const Bot: FC<IBotProps> = observer(({ bot }) => {
  const appStore = useInject<IAppStore>(IAppStoreTid)

  const selected = appStore.selected.find((el) => el === bot.id)

  const onPress = useCallback(() => {
    appStore.addSelected(bot.id)
  }, [bot.id, appStore])

  return (
    <Pressable onPress={onPress} style={SS.container}>
      <Image source={{ uri: bot.imagePath }} style={SS.image} />

      <View style={SS.containerRight}>
        <View>
          <Text style={SS.botName}>{bot.name}</Text>
          <Text style={SS.botDesc}>{bot.tagLine}</Text>
        </View>
        <View style={SS.empty}>{selected && <Svg name={'Check'} />}</View>
      </View>
    </Pressable>
  )
})

const SS = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  containerRight: {
    alignItems: 'center',
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#333333'
  },
  botName: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.2,
    marginTop: 3.5
  },
  botDesc: {
    color: '#98989E',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.2,
    marginTop: 2,
    marginBottom: 7.5,
    maxWidth: deviceWidth * 0.75
  },
  empty: {
    width: 20,
    height: 20,
    borderRadius: 250,
    borderWidth: 1,
    borderColor: '#484849',
    marginRight: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: { width: 36, height: 36, borderRadius: 250 }
})
