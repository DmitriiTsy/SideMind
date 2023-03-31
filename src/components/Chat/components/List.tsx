import React, { useMemo } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { Message } from 'components/Chat/components/Message'
import { IMessage } from 'components/Chat/types'

import { IAppStore, IAppStoreTid } from 'store/AppStore'

import { Pending } from './Pending'

export const List = observer(() => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const appStore = useInject<IAppStore>(IAppStoreTid)

  const avatar = useMemo(
    () => appStore.usersAvatars.find((el) => el.data.id === chatVM.id),
    [appStore.usersAvatars, chatVM.id]
  )

  const renderItem = ({ item, index }: ListRenderItemInfo<IMessage>) => {
    return <Message message={item} index={index} />
  }

  const keyExtractor = (item, index) => index

  const pending = useMemo(
    () => avatar?.pending && <Pending />,
    [avatar?.pending]
  )

  return (
    <FlatList
      data={avatar?.data.messages.displayed.slice().reverse() || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={SS.flatList}
      ListHeaderComponent={pending}
      inverted
      showsVerticalScrollIndicator={false}
    />
  )
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
