import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Avatar } from 'components/SelectAvatars/components/Avatar'
import { AvatarModel } from 'services/FirebaseService/types'

interface IGroupedBotsProps {
  avatar: AvatarModel[]
  single?: boolean
}

export const GroupedAvatars: FC<IGroupedBotsProps> = ({ avatar, single }) => {
  return (
    <View style={SS.container}>
      <Text style={SS.title}>{avatar[0].category}</Text>
      <View style={SS.separator} />
      {avatar.map((el, index) => (
        <Avatar key={index} avatar={el} single={single} />
      ))}
    </View>
  )
}

const SS = StyleSheet.create({
  container: { marginLeft: 18, marginTop: 21 },
  separator: {
    marginTop: 8,
    marginBottom: 4.5,
    height: 0.5,
    width: '100%',
    backgroundColor: '#333333'
  },
  title: {
    color: '#99989E',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16
  }
})
