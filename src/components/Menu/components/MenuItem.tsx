import React, { FC } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Svg } from 'components/ui/Svg'
import { IMenuItem } from 'components/Menu/useMenuItems'

interface IMenuItemProps {
  item: IMenuItem
  index: number
  arrayLength: number
}
export const MenuItem: FC<IMenuItemProps> = ({ item, index, arrayLength }) => {
  return (
    <Pressable style={SS.menuItem} onPress={item.onPress}>
      <View style={{ width: '10%' }}>
        <Svg name={item.icon} />
      </View>
      <View
        style={[
          SS.menuItemInfo,
          {
            marginBottom: index !== arrayLength - 1 ? 10 : 0,
            paddingBottom: index !== arrayLength - 1 ? 10 : 0,
            borderBottomWidth: index !== arrayLength - 1 ? 0.5 : 0
          }
        ]}
      >
        <Text style={SS.itemText}>{item.text}</Text>
        <Svg style={{ marginRight: 18 }} name={'PointerRight'} />
      </View>
    </Pressable>
  )
}
const SS = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    paddingLeft: 18
  },
  menuItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    borderBottomColor: '#444444'
  },
  itemText: {
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: 0.5,
    lineHeight: 21
  }
})
