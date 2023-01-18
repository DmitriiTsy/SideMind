export enum ESender {
  BOT = 'BOT',
  HUMAN = 'HUMAN',
  RESET = 'RESET'
}

export interface IMessage {
  sender: ESender
  text: string
}
