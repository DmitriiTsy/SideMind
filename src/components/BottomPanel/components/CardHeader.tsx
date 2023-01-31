import React  from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { observer } from 'mobx-react'


export const CardHeader = observer(() => {



  return (
    <View style={SS.container}>
      <View style={{ width: 30, height: 1 }} />
      <Pressable style={SS.doneContainer} >
        <Text >
          {t.get('done')}
        </Text>
      </Pressable>
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#303030',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14
  },
  activeText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#559EF8'
  },
  inactiveText: {
    color: '#484849'
  },
  doneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  counter: {
    fontWeight: '400',
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center'
  }
})
