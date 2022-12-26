import {
  GestureResponderEvent,
  Insets,
  StyleProp,
  ViewStyle
} from 'react-native'

import { SVG_MAP } from 'components/ui/Svg/constants'

export interface SvgStyleProps {
  width: number | string
  height: number | string
  viewBox: string
  style?: StyleProp<ViewStyle>
  color?: string
  opacity?: number
  isActive?: boolean
  [s: string]: any
}

export interface ISvgProps extends SvgProps {
  name: keyof typeof SVG_MAP
  onPress?: (event: GestureResponderEvent) => void
  hitSlop?: Insets
  style?: StyleProp<ViewStyle>
}

export interface CreateSvgProps {
  component: (props: SvgStyleProps) => JSX.Element
  originalHeight: number
  originalWidth: number
}

export interface SvgProps {
  size?: number
  sizeTarget?: 'width' | 'height'
  sizeUnit?: '%' | 'px'
  style?: StyleProp<ViewStyle>
  color?: string
  opacity?: number

  [s: string]: any
}
