import { action, observable } from 'mobx'

import { Injectable } from 'IoC'
import { BotModel } from 'services/FirebaseService/types'

export const IAppStoreTid = Symbol.for('IAppStoreTid')

export interface IAppStore {
  selected: number[]
  usedBots: BotModel[]
  availableBots: BotModel[][]

  addSelected(id: number): void
  setAvailableBots(bots: BotModel[][]): void
  setUsedBots(): void
}

@Injectable()
export class AppStore implements IAppStore {
  @observable selected: number[] = []
  @observable availableBots: BotModel[][] = []
  @observable usedBots: BotModel[] = []

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
  setUsedBots() {
    const _bots: BotModel[] = []
    this.availableBots.map((bots) =>
      bots.map((bot) => this.selected.includes(bot.id) && _bots.push(bot))
    )
    this.usedBots = _bots
  }
}
