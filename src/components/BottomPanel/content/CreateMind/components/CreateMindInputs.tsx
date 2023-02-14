import React from 'react'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

import { Input } from 'components/Input/Input'

export const CreateMindInputs = observer(() => {
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  return (
    <>
      <Input vm={createMindVM.inputName} />
      <Input vm={createMindVM.inputTagLine} />
      <Input vm={createMindVM.inputBio} />
    </>
  )
})
