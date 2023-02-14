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
  autoFocus?: boolean
  onSubmitEditing?: () => void
  defaultValue?: string
  editable?: boolean
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
  autoFocus: boolean
  onSubmitEditing: () => void
  editable: boolean

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
  autoFocus: boolean
  onSubmitEditing: () => void
  editable: boolean

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
    this.autoFocus = props.autoFocus
    this.onSubmitEditing = props.onSubmitEditing
    this.editable = props.editable

    if (props.defaultValue) {
      this.value = props.defaultValue
    }
    this.isFocused = props.autoFocus
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
