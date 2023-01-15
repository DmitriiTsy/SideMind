import { action, observable } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { BotModel } from 'services/FirebaseService/types'
import { IStorageService, IStorageServiceTid } from 'services/StorageService'
import { IMessage } from 'components/Chat/types'

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
  setAvatarsFromStorage(): void
  setMessageToAvatar(botId: number, message: IMessage): void
  setHistoryToAvatar(botId: number, history: string): void
}

@Injectable()
export class AppStore implements IAppStore {
  @observable selected: number[] = []
  @observable availableBots: BotModel[][] = []
  @observable usedBots: BotModel[] = []
  @observable startingBots: BotModel[][] = []

  constructor(
    @Inject(IStorageServiceTid)
    private readonly _storageService: IStorageService
  ) {}

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
    this._storageService.setUserAvatars(this.usedBots)
  }

  @action.bound
  addUsed(bot: BotModel) {
    const exist = this.usedBots.find((el) => el.id === bot.id)
    if (!exist) {
      this.usedBots = [...this.usedBots, bot]
      this._storageService.setUserAvatars(this.usedBots)
    }
  }

  @action.bound
  setAvatarsFromStorage() {
    this.usedBots = this._storageService.getUserAvatars()
  }

  //todo объеденить след два метода
  setMessageToAvatar(botId: number, message: IMessage) {
    this.usedBots = this.usedBots.map((el) => {
      if (el.id === botId) {
        // if (!el.messages) el.messages = { displayed: [], history: '' }
        el.messages.displayed = [message, ...el.messages.displayed]
      }
      return el
    })
    this._storageService.setUserAvatars(this.usedBots)
  }

  setHistoryToAvatar(botId: number, history: string) {
    this.usedBots = this.usedBots.map((el) => {
      if (el.id === botId) {
        if (!el.messages) el.messages = { displayed: [], history: '' }
        el.messages.history = history
      }
      return el
    })
  }
}
