import React from 'react'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

import { CardInput } from './CardInput'
import { ScrollView } from 'react-native'

export const CardBody = observer(() => {
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  return (
    <>
      {Object.values(createMindVM.inputs).map((value, index) => (
        <CardInput key={index} input={value} />
      ))}
    </>
  )
})
