import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

import range from 'lodash/range'

import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

export const Dots = observer(() => {
  const chatVM = useInject<IChatVM>(IChatVMTid)

  const Pending = () =>
    chatVM.pending ? (
      <View style={SS.pendingContainer}>
        {range(3).map((_, index) => (
          <View key={index} style={SS.pendingDot} />
        ))}
      </View>
    ) : (
      <></>
    )
  return <Pending />
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
