export enum ESender {
  BOT = 'BOT',
  HUMAN = 'HUMAN'
}

export interface IMessage {
  sender: ESender
  text: string
}
