export enum EBotsCategory {
  None = 'None',
  SelfImprovement = 'Self-Improvement',
  Productivity = 'Productivity',
  Hobbies = 'Hobbies',
  Relationships = 'Relationships',
  Entertainment = 'Entertainment'
}

interface IBot {
  name: string
  tagLine: string
  prompt: string
}

export interface IBotsMap {
  [EBotsCategory.None]: IBot[]
  [EBotsCategory.SelfImprovement]: IBot[]
  [EBotsCategory.Productivity]: IBot[]
  [EBotsCategory.Hobbies]: IBot[]
  [EBotsCategory.Relationships]: IBot[]
  [EBotsCategory.Entertainment]: IBot[]
}
