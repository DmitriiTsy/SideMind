import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

export const OneBot = observer(() => {
  return (
    <View style={SS.pendingContainer}>
      <View style={SS.image}></View>
      <View style={SS.textWrapper}>
        <View style={SS.textHeader}></View>
        <View style={SS.textRegular}></View>
      </View>
    </View>
  )
})

const SS = StyleSheet.create({
  pendingContainer: {
    height: 45,
    width: '100%',
    backgroundColor: '#1C1C1E',
    borderBottomLeftRadius: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    borderRadius: 25,
    backgroundColor: 'rgba(72, 72, 73, 0.3)',
    width: 36,
    height: 36,
    marginRight: 12
  },
  textHeader: {
    width: 81,
    height: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(72, 72, 73, 0.3)',
    marginBottom: 2
  },
  textRegular: {
    width: 162,
    height: 8,
    borderRadius: 25,
    backgroundColor: 'rgba(72, 72, 73, 0.3)'
  },
  textWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 45,
    borderBottomColor: 'rgba(72, 72, 73, 0.3)',
    borderBottomWidth: 0.5,
    width: '100%'
  },
  pendingDot: {
    height: 5,
    width: 5,
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 7
  }
})
