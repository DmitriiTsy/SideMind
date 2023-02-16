import {
  EInputType,
  ICreateMindInput
} from 'components/BottomPanel/content/CreateMind/types'

export const INPUTS: { [key: string]: ICreateMindInput } = {
  [EInputType.FullName]: {
    label: 'full name',
    placeholder: 'placeholder full name',
    type: EInputType.FullName,
    value: '',
    minLength: 5,
    validateError: 'name requirements'
  },
  [EInputType.Tagline]: {
    label: 'tagline',
    placeholder: 'placeholder tagline',
    type: EInputType.Tagline,
    value: '',
    minLength: 5,
    validateError: 'tagline requirements'
  },
  [EInputType.Bio]: {
    label: 'bio',
    placeholder: 'placeholder bio',
    type: EInputType.Bio,
    value: '',
    minLength: 15,
    validateError: 'bio requirements'
  }
}
