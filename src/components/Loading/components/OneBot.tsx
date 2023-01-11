import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

export const OneBot = observer(() => {
  return <View style={SS.pendingContainer}></View>
})

const SS = StyleSheet.create({
  flatList: {
    flex: 1
  },
  pendingContainer: {
    height: 38,
    width: 40,
    backgroundColor: '#363637',
    marginLeft: 14,
    marginVertical: 12,
    borderRadius: 12,
    borderBottomLeftRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pendingDot: {
    height: 5,
    width: 5,
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 7
  }
})
