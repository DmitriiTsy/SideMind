import { action, observable, runInAction } from 'mobx'

import { Inject, Injectable } from 'IoC'
import { IOpenAIService, IOpenAIServiceTid } from 'services/OpenAIService'

export const IChatVMTid = Symbol.for('IChatVMTid')

export enum ESender {
  BOT = 'BOT',
  HUMAN = 'HUMAN'
}

export interface IMessage {
  sender: ESender
  text: string
}

export interface IChatVM {
  messages: IMessage[]

  sendMessage(message: string): void
}

@Injectable()
export class ChatVM implements IChatVM {
  @observable messages: IMessage[] = []

  constructor(
    @Inject(IOpenAIServiceTid) private _openAIService: IOpenAIService
  ) {}

  @action.bound
  async sendMessage(message: string) {
    this.messages = [{ sender: ESender.HUMAN, text: message }, ...this.messages]
    const res = await this._openAIService.createCompletion(message)
    runInAction(
      () =>
        (this.messages = [{ sender: ESender.BOT, text: res }, ...this.messages])
    )
  }
}
