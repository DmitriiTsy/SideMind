import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export interface IScreenContainerProps {
  topInsetColor: string
  bottomInsetColor: string
  children: ReactNode
  style?: StyleProp<ViewStyle>
}
