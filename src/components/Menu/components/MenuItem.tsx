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
        <Svg size={29} name={item.icon} />
      </View>
      <View
        style={[
          SS.menuItemInfo,
          { borderBottomWidth: index !== arrayLength - 1 ? 0.5 : 0 }
        ]}
      >
        <Text style={SS.itemText}>{item.text}</Text>
        <Svg style={{ paddingRight: 18 }} name={'PointerRight'} />
      </View>
    </Pressable>
  )
}
const SS = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    height: 45
  },
  menuItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '82%',
    height: '100%',
    borderBottomColor: '#444444',
    marginLeft: 18
  },
  itemText: {
    fontSize: 15,
    color: '#FFFFFF'
  }
})
