import React from 'react'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

import { Input } from 'components/Input/Input'

export const CreateMindInputs = observer((props) => {
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  return (
    <>
      <Input vm={createMindVM.inputName} savedData={props.name} />
      <Input vm={createMindVM.inputTagLine} savedData={props.tagline} />
      <Input vm={createMindVM.inputBio} savedData={props.bio} />
    </>
  )
})
