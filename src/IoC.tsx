import { Container, interfaces } from 'inversify'
import React, { useContext } from 'react'

export {
  injectable as Injectable,
  inject as Inject,
  Container
} from 'inversify'

import 'reflect-metadata'

export interface IoCModule {
  Configure(ioc: Container): void
}

const ioc = new Container()

export function iocLoadModule(module: IoCModule) {
  module.Configure(ioc)
}

const InversifyContext = React.createContext<{ ioc: Container | null }>({
  ioc: null
})

export const IocProvider = (props: { children: any }) => {
  return (
    <InversifyContext.Provider value={{ ioc }}>
      {props.children}
    </InversifyContext.Provider>
  )
}

export function useInject<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { ioc } = useContext(InversifyContext)
  if (!ioc) {
    throw new Error('useInject error: ioc is null')
  }
  return ioc.get<T>(identifier)
}
