import React from 'react'
import { StyleSheet, FlatList, ListRenderItemInfo } from 'react-native'

import { observer } from 'mobx-react'

import { ScreenContainer } from 'components/ScreenContainer'
import { SelectAvatarsHeader } from 'components/SelectAvatars/components'

import { GroupedAvatars } from 'components/SelectAvatars/components/GroupedAvatars'

import { useInject } from 'IoC'

import { AvatarModel } from 'services/FirebaseService/types'
import { SkeletonAvatars } from 'components/SelectAvatars/components/skeleton/Skeleton'
import {
  ISelectAvatarsVM,
  ISelectAvatarsVMTid
} from 'components/SelectAvatars/SelectAvatars.vm'

export const SelectAvatars = observer(() => {
  const vm = useInject<ISelectAvatarsVM>(ISelectAvatarsVMTid)

  const renderItem = ({ item }: ListRenderItemInfo<AvatarModel[]>) => (
    <GroupedAvatars avatar={item} />
  )

  const keyExtractor = (item, index) => index
  return (
    <ScreenContainer
      topInsetColor={'black'}
      bottomInsetColor={'#1C1C1E'}
      style={SS.screenContainer}
    >
      <SelectAvatarsHeader />

      {vm.commonAvatars.length === 0 ? (
        <SkeletonAvatars />
      ) : (
        <FlatList
          data={vm.commonAvatars}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          style={SS.flatList}
        />
      )}
    </ScreenContainer>
  )
})

const SS = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  flatList: {
    backgroundColor: '#1C1C1E'
  },
  screenContainer: {
    backgroundColor: 'black'
  }
})
