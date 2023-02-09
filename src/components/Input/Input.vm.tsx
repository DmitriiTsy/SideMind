import { action, computed, observable } from 'mobx'

import { RefObject } from 'react'
import { TextInput } from 'react-native'

import { Translation } from 'services'

interface IInputVMProps {
  placeholder?: keyof Translation
  label?: keyof Translation
  minLength?: number
  maxLength?: number
  errorText?: keyof Translation
  ref?: RefObject<TextInput>
  onFocus?: () => void
  onBlur?: () => void
  instantOpening?: boolean
  onSubmitEditing?: () => void
}

export interface IInputVM {
  value: string
  placeholder: keyof Translation
  label: keyof Translation
  minLength: number
  maxLength: number
  errorText: keyof Translation
  ref: RefObject<TextInput>
  onFocus: () => void
  onBlur: () => void
  instantOpening: boolean
  onSubmitEditing: () => void

  isFocused: boolean

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
  ref: RefObject<TextInput>
  onFocusProps: () => void
  onBlurProps: () => void
  instantOpening: boolean
  onSubmitEditing: () => void

  @observable isFocused: boolean

  constructor(props: IInputVMProps) {
    this.placeholder = props.placeholder
    this.label = props.label
    this.minLength = props.minLength
    this.maxLength = props.maxLength
    this.errorText = props.errorText
    this.ref = props.ref
    this.onFocusProps = props.onFocus
    this.onBlurProps = props.onBlur
    this.instantOpening = props.instantOpening
    this.onSubmitEditing = props.onSubmitEditing

    this.isFocused = props.instantOpening
  }

  @computed
  get hasError() {
    return this.value.length < this.minLength ||
      this.value.length > this.maxLength
      ? this.errorText
      : false
  }

  @action.bound
  onFocus() {
    this.onFocusProps && this.onFocusProps()
    this.isFocused = true
  }

  @action.bound
  onBlur() {
    this.onBlurProps && this.onBlurProps()
    this.isFocused = false
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
