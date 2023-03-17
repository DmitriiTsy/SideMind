import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { useInject } from 'IoC'
import { IStorageService, IStorageServiceTid } from 'services/StorageService'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { INavigationService, INavigationServiceTid } from 'services'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

export const useSharedAvatar = () => {
  const storage = useInject<IStorageService>(IStorageServiceTid)
  const appStore = useInject<IAppStore>(IAppStoreTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const chatVM = useInject<IChatVM>(IChatVMTid)

  const cb = useCallback(
    async (bID: string, general: boolean, starting: boolean) => {
      await appStore.init()
      if (!storage.getUserLogin()) {
        storage.setUserLogin()
        storage.setCustomAvatarsInCustomList()
        storage.setAddedFieldsForOldAvatars()
        appStore.setStartingAvatars()
      }

      chatVM.getSharedAvatar(bID, general, starting)
    },
    [appStore, chatVM, storage]
  )

  useFocusEffect(
    useCallback(() => {
      if (navigation.params?.bID) {
        const { bID, general, starting } = navigation.params
        cb(bID, general, starting)
      }
    }, [cb, navigation.params])
  )
}
