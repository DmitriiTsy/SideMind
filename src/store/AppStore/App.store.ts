import { action, observable } from 'mobx'

import { Injectable, useInject } from 'IoC'
import { BotModel } from 'services/FirebaseService/types'
import { IStorageService, IStorageServiceTid } from 'services/StorageService'

export const IAppStoreTid = Symbol.for('IAppStoreTid')

export interface IAppStore {
  selected: number[]
  usedBots: BotModel[]
  availableBots: BotModel[][]
  startingBots: BotModel[][]

  addSelected(id: number): void
  setAvailableBots(bots: BotModel[][]): void
  setStartingBots(bots: BotModel[][]): void
  setUsedBots(): void
  addUsed(bot: BotModel): void
  storageSetUsedBots(): void
}

const StorageHandler = () => {
  const storage = useInject<IStorageService>(IStorageServiceTid)
  return storage
}

@Injectable()
export class AppStore implements IAppStore {
  @observable selected: number[] = []
  @observable availableBots: BotModel[][] = []
  @observable usedBots: BotModel[] = []
  @observable startingBots: BotModel[][] = []
  storage = StorageHandler()
  @action.bound
  addSelected(id: number) {
    if (this.selected.find((el) => el === id)) {
      this.selected = this.selected.filter((el) => el !== id)
    } else if (this.selected.length === 3) {
      this.selected.shift()
      this.selected.push(id)
    } else {
      this.selected.push(id)
    }
  }

  @action.bound
  setAvailableBots(bots: BotModel[][]) {
    this.availableBots = bots
  }

  @action.bound
  setStartingBots(bots: BotModel[][]) {
    this.startingBots = bots
  }

  @action.bound
  setUsedBots() {
    const _bots: BotModel[] = []
    this.availableBots.map((bots) =>
      bots.map((bot) => this.selected.includes(bot.id) && _bots.push(bot))
    )
    this.startingBots.map((bots) => bots.map((bot) => _bots.unshift(bot)))
    this.usedBots = _bots
  }

  @action.bound
  storageSetUsedBots() {
    const _bots: BotModel[] = []
    this.usedBots.map((bots) =>
      bots.map((bot) => this.selected.includes(bot.id) && _bots.push(bot))
    )
    this.startingBots.map((bots) => bots.map((bot) => _bots.unshift(bot)))
    this.storage.setUserAvatars()
  }

  @action.bound
  addUsed(bot: BotModel) {
    const exist = this.usedBots.find((el) => el.id === bot.id)
    if (!exist) {
      this.usedBots.push(bot)
    }
  }
}
