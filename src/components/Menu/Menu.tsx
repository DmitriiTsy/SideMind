import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Svg } from 'components/ui/Svg'
import { ScreenContainer } from 'components/ScreenContainer'
import { INavigationService, INavigationServiceTid } from 'services'
import { useInject } from 'IoC'
import { MenuItem } from 'components/Menu/components'
import { useMenuItems } from 'components/Menu/useMenuItems'

export const Menu = () => {
  const navigation = useInject<INavigationService>(INavigationServiceTid)

  const { socialMedia, mainItems } = useMenuItems()

  const header = () => {
    return (
      <View style={SS.headerContainer}>
        <Pressable
          style={{ position: 'absolute', left: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Svg name={'PointerLeft'} />
        </Pressable>
        <Text style={SS.title}>Menu</Text>
      </View>
    )
  }

  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      {header()}
      <View style={SS.container}>
        {socialMedia.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            index={index}
            arrayLength={socialMedia.length}
          />
        ))}
      </View>
      <View style={SS.container}>
        {mainItems.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            index={index}
            arrayLength={mainItems.length}
          />
        ))}
      </View>
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#000000',
    alignItems: 'center'
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    color: '#FFFFFF'
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    position: 'relative'
  },
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginTop: 34,
    paddingVertical: 10
  }
})
