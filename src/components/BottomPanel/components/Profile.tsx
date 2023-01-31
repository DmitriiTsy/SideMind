import React from 'react'
import { StyleSheet, View } from 'react-native'

import { observer } from 'mobx-react'

export const Profile = observer(() => {
  return <View style={SS.container}></View>
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14
  }
})
