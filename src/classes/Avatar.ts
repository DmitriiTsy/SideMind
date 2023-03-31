import { action, observable, runInAction } from 'mobx'

import {
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessage
} from 'openai'

import dayjs from 'dayjs'

import { AvatarModel, EAvatarsCategory } from 'services/FirebaseService/types'
import { ESender, IMessage } from 'components/Chat/types'

import { EModel, OpenAi } from './OpenAi'

const DATE_FORMAT = 'MM-DD-YYYY'

//todo change pending state if got Error
//todo what should we expect if get default shared avatar which already removed from FB

interface IAvatarProps {
  data: AvatarModel
  updateStore(message: IMessage, avatarID: string | number, model: EModel): void
  loadFBData(): void
}

export interface IAvatar {
  readonly data: AvatarModel
  readonly pending: boolean

  sendMessage(text: string): void
  getFirstMessage(): void
  reset(): void
  updateAvatarData(data: Partial<AvatarModel>): void
}

export class Avatar extends OpenAi implements IAvatar {
  @observable data: AvatarModel
  @observable pending: boolean
  private readonly SOMETHING_CAME_UP =
    'Something came up, can you get back to me in a few minutes.'
  private readonly updateStore: (
    message: IMessage,
    avatarID: string | number,
    model: EModel
  ) => void
  private readonly loadFBData: () => void

  constructor(props: IAvatarProps) {
    super()
    this.data = props.data
    this.pending = false

    if (!this.data.messages) {
      this.data.messages = {
        displayed: [],
        history: '',
        historyTurbo: []
      }
    }
    this.updateStore = props.updateStore
    this.loadFBData = props.loadFBData
  }

  @action.bound
  private _changePendingState(value: boolean) {
    this.pending = value
  }

  async sendMessage(text: string) {
    this._changePendingState(true)

    if (this.data.isAvatarUseModel3) {
      await this._sendMessageModel3(text)
    } else {
      await this._sendMessageModel3Turbo(text)
    }

    this._changePendingState(false)
  }

  async getFirstMessage() {
    this._changePendingState(true)

    if (this.data.category === EAvatarsCategory.Custom) {
      this.data.messages = {
        ...this.data.messages,
        historyTurbo: [
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: this.data.prompt + '.'
          }
        ]
      }
    } else {
      this.data.messages = {
        ...this.data.messages,
        historyTurbo: [
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: this.data.turbo_init.system
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: this.data.turbo_init.user
          }
        ]
      }
    }

    const messages = this._replaceCurrentDate()

    let res: ChatCompletionResponseMessage | string | Error =
      await this.createChatCompletion(messages, this.data.params)

    while (res instanceof Error) {
      console.log(res)
      if (res.message === this.ERROR_TOKEN_LENGTH) {
        const _messages = this._cutHistoryTurbo()
        res = await this.createChatCompletion(_messages, this.data.params)
      } else if (res.message === this.ERROR_SERVICE_UNAVAILABLE) {
        res = await this.createCompletion(
          this.data.messages.history,
          this.data.params
        )
      } else {
        break
      }
    }

    this.setMessage(res)

    this._changePendingState(false)
  }

  private async _sendMessageModel3(text: string) {
    runInAction(() => {
      const msg: IMessage = {
        sender: ESender.HUMAN,
        text,
        date: new Date()
      }
      this.data.messages = {
        ...this.data.messages,
        displayed: [...this.data.messages.displayed, msg],
        history: `${this.data.messages.history} \n\n###: ${text}. \n\n`
      }
      this.updateStore(msg, this.data.id, EModel.davinci3)
    })

    let res = await this.createCompletion(
      this.data.messages.history,
      this.data.params
    )

    while (res instanceof Error) {
      console.log(res)
      if (res.message === this.ERROR_SERVICE_UNAVAILABLE) {
        res = await this.createCompletion(
          this.data.messages.history,
          this.data.params
        )
      } else {
        break
      }
    }

    runInAction(() => {
      if (!(res instanceof Error)) {
        const msg: IMessage = {
          sender: ESender.BOT,
          text: res,
          date: new Date()
        }
        this.data.messages = {
          ...this.data.messages,
          displayed: [...this.data.messages.displayed, msg],
          history: `${this.data.messages.history} ${res}`
        }
        this.updateStore(msg, this.data.id, this._model)
      } else {
        const msg: IMessage = {
          sender: ESender.BOT,
          text: this.SOMETHING_CAME_UP,
          date: new Date()
        }
        this.data.messages = {
          ...this.data.messages,
          displayed: [...this.data.messages.displayed, msg]
        }
        this.updateStore(msg, this.data.id, this._model)
      }
    })
  }

  private async _sendMessageModel3Turbo(text: string) {
    runInAction(() => {
      const msg: IMessage = { sender: ESender.HUMAN, text, date: new Date() }
      this.data.messages = {
        displayed: [...this.data.messages.displayed, msg],
        history: '',
        historyTurbo: [
          ...this.data.messages.historyTurbo,
          { role: ChatCompletionRequestMessageRoleEnum.User, content: text }
        ]
      }
      this.updateStore(msg, this.data.id, EModel.davinci3turbo)
    })

    this._replaceCurrentDate()

    let res: ChatCompletionResponseMessage | Error | string =
      await this.createChatCompletion(
        this.data.messages.historyTurbo,
        this.data.params
      )

    while (res instanceof Error) {
      console.log(res)
      if (res.message === this.ERROR_TOKEN_LENGTH) {
        const _messages = this._cutHistoryTurbo()
        res = await this.createChatCompletion(_messages, this.data.params)
      } else if (res.message === this.ERROR_SERVICE_UNAVAILABLE) {
        this._convertHistoryTurboToHistory()
        res = await this.createCompletion(
          this.data.messages.history,
          this.data.params
        )
      } else {
        break
      }
    }

    this.setMessage(res)
  }

  @action.bound
  reset() {
    this.data.messages = {
      displayed: [],
      history: '',
      historyTurbo: []
    }

    this.updateStore(
      { sender: ESender.RESET, text: '', date: new Date() },
      this.data.id,
      EModel.davinci3turbo
    )

    this.loadFBData()

    this.getFirstMessage()
  }

  private _replaceCurrentDate() {
    this.data.messages.historyTurbo = this.data.messages.historyTurbo.map(
      (el, index) => {
        if (this.data.category !== EAvatarsCategory.Custom && index === 0) {
          return {
            ...el,
            content: el.content.replace(
              /{current_datetime}/m,
              dayjs().format(DATE_FORMAT)
            )
          }
        }
        return el
      }
    )

    return this.data.messages.historyTurbo
  }

  private _cutHistoryTurbo() {
    if (this.data.category === EAvatarsCategory.Custom) {
      this.data.messages.historyTurbo.splice(1, 1)
      return this.data.messages.historyTurbo
    } else {
      this.data.messages.historyTurbo.splice(2, 1)
      return this._replaceCurrentDate()
    }
  }

  private _convertHistoryTurboToHistory() {
    this.data.messages.history = this.data.messages.historyTurbo
      .map(
        (el, index) =>
          `${el.content} ${
            this.data.category !== EAvatarsCategory.Custom && index === 0
              ? '\n'
              : '\n\n###: \n\n'
          }`
      )
      .join('')
  }

  @action.bound
  updateAvatarData(data: Partial<AvatarModel>) {
    this.data = {
      ...this.data,
      ...data
    }
  }

  @action.bound
  private setMessage(res: ChatCompletionResponseMessage | string | Error) {
    if (res instanceof Error) {
      const msg: IMessage = {
        sender: ESender.BOT,
        text: this.SOMETHING_CAME_UP,
        date: new Date()
      }
      this.data.messages.displayed = [...this.data.messages.displayed, msg]
      this.updateStore(msg, this.data.id, EModel.davinci3turbo)
    } else if (typeof res === 'string') {
      const msg: IMessage = {
        sender: ESender.BOT,
        text: res,
        date: new Date()
      }
      this.data.messages = {
        ...this.data.messages,
        displayed: [...this.data.messages.displayed, msg],
        historyTurbo: [
          ...this.data.messages.historyTurbo,
          {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: res
          }
        ]
      }
      this.updateStore(msg, this.data.id, this._model)
    } else {
      const msg: IMessage = {
        sender: ESender.BOT,
        text: res.content,
        date: new Date()
      }
      this.data.messages = {
        ...this.data.messages,
        displayed: [...this.data.messages.displayed, msg],
        historyTurbo: [...this.data.messages.historyTurbo, res]
      }
      this.updateStore(msg, this.data.id, EModel.davinci3turbo)
    }
  }
}
