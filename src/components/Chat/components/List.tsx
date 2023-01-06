import React from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { IChatVM, IChatVMTid, IMessage } from 'components/Chat/Chat.vm'
import { Message } from 'components/Chat/components/Message'

export const List = observer(() => {
  const chatVM = useInject<IChatVM>(IChatVMTid)

  const renderItem = ({ item, index }: ListRenderItemInfo<IMessage>) => {
    return <Message message={item} index={index} />
  }

  const keyExtractor = (item, index) => index

  return (
    <FlatList
      data={chatVM.messages}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={SS.flatList}
      inverted
    />
  )
})

const SS = StyleSheet.create({
  flatList: {
    flex: 1
  }
})
