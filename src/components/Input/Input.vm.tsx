import { action, computed, observable } from 'mobx'

import { Translation } from 'services'

interface IInputVMProps {
  placeholder?: keyof Translation
  label?: keyof Translation
  minLength?: number
  maxLength?: number
  errorText?: keyof Translation
}

export interface IInputVM {
  value: string
  placeholder: keyof Translation
  label: keyof Translation
  minLength: number
  maxLength: number
  errorText: keyof Translation

  hasError: boolean | keyof Translation

  onChangeText(text: string): void
  clear(): void
}

export class InputVM implements IInputVM {
  @observable value = ''
  placeholder: keyof Translation
  label: keyof Translation
  minLength: number
  maxLength: number
  errorText: keyof Translation

  constructor(props: IInputVMProps) {
    this.placeholder = props.placeholder
    this.label = props.label
    this.minLength = props.minLength
    this.maxLength = props.maxLength
    this.errorText = props.errorText
  }

  @computed
  get hasError() {
    return this.value.length < this.minLength ||
      this.value.length > this.maxLength
      ? this.errorText
      : false
  }

  @action.bound
  onChangeText(text: string) {
    this.value = text
  }

  @action.bound
  clear() {
    this.value = ''
  }
}
