import { action, observable } from 'mobx'

import { RefObject } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import { Injectable, Inject } from 'IoC'

import {
  ILayoutService,
  ILayoutServiceTid,
  INavigationService,
  INavigationServiceTid
} from 'services'

import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'

import { ScreenParamTypes } from '../constants/screen.types'

export const IAppVMTid = Symbol.for('IAppVMTid')

export interface IAppVM {
  init(): void

  initNavigation(
    navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>
  ): void
}

export const ISelectBotsVMTid = Symbol.for('ISelectBotsVMTid')

export interface ISelectBotsVM {
  selected: number[]
  addBot(id: number): void
}

@Injectable()
export class SelectBotsVM implements ISelectBotsVM {
  @observable selected: number[] = []

  @action.bound
  addBot(id: number) {
    if (this.selected.find((el) => el === id)) {
      this.selected = this.selected.filter((el) => el !== id)
    } else if (this.selected.length === 3) {
      this.selected.shift()
      this.selected.push(id)
    } else {
      this.selected.push(id)
    }
  }
}

@Injectable()
export class AppVM implements IAppVM {
  constructor(
    @Inject(INavigationServiceTid)
    private _navigationService: INavigationService,
    @Inject(ILayoutServiceTid) private _layoutService: ILayoutService,
    @Inject(IFirebaseServiceTid) private _firebaseService: IFirebaseService
  ) {}

  async init() {
    this._layoutService.init()
    await this._firebaseService.init()
  }

  initNavigation(
    navigationRef: RefObject<NavigationContainerRef<ScreenParamTypes>>
  ) {
    this._navigationService.init(navigationRef)
  }
}
