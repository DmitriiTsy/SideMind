import { Translation } from 'services'

export enum EInputType {
  FullName = 'FullName',
  Tagline = 'Tagline',
  Bio = 'Bio'
}

export interface ICreateMindInput {
  label: keyof Translation
  placeholder: keyof Translation
  type: EInputType
  value: string
  minLength: number
  validateError: keyof Translation
}
