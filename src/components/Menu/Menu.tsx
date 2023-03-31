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

  const goBack = () => {
    navigation.goBack()
  }

  const header = () => {
    return (
      <View style={SS.headerContainer}>
        <Text style={SS.title}>Menu</Text>
        <Pressable onPress={goBack}>
          <Svg style={{ marginRight: 18 }} size={30} name={'Cross'} />
        </Pressable>
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
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={SS.menuTitle}>Social</Text>
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
      </View>

      <View style={{ paddingHorizontal: 18 }}>
        <Text style={[SS.menuTitle, { marginTop: 18 }]}>Settings</Text>
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
      </View>
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#000000'
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    color: '#FFFFFF',
    marginLeft: 18
  },
  headerContainer: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    paddingBottom: 18,
    marginBottom: 36,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12
    // paddingVertical: 10
  },
  menuTitle: {
    color: '#989898',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.3,
    marginBottom: 9
  }
})
