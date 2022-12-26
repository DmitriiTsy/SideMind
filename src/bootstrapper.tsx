import React from 'react'

import { iocLoadModule, IocProvider } from 'IoC'
import { App } from 'app'

import { AppModule } from './App.module'

export function bootstrapper() {
  const module = new AppModule()
  iocLoadModule(module)

  return (props: any) => (
    <IocProvider>
      <App {...props} />
    </IocProvider>
  )
}
