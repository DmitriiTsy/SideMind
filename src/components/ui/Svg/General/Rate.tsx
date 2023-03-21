import React, { FC } from 'react'

import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
        <Rect x="0.5" width="24" height="24" rx="6" fill="#F09A37"/>
        <G clip-path="url(#clip0_2394_149701)">
            <Path d="M7.66621 18.8627C7.95583 19.0888 8.32316 19.0111 8.76112 18.6932L12.498 15.9452L16.242 18.6932C16.6799 19.0111 17.0402 19.0888 17.3369 18.8627C17.6265 18.6437 17.69 18.2835 17.5134 17.7678L16.0371 13.374L19.8093 10.6614C20.2472 10.3506 20.4239 10.0256 20.3108 9.67241C20.1978 9.33334 19.8658 9.1638 19.3218 9.17086L14.6949 9.19912L13.2892 4.78411C13.1196 4.26137 12.8653 4 12.498 4C12.1377 4 11.8834 4.26137 11.7139 4.78411L10.3081 9.19912L5.68121 9.17086C5.13728 9.1638 4.80527 9.33334 4.69225 9.67241C4.57216 10.0256 4.75583 10.3506 5.19379 10.6614L8.96599 13.374L7.4896 17.7678C7.313 18.2835 7.37657 18.6437 7.66621 18.8627Z" fill="white"/>
        </G>
        <Defs>
            <ClipPath id="clip0_2394_149701">
                <Rect width="15.6879" height="16" fill="white" transform="translate(4.65625 4)"/>
            </ClipPath>
        </Defs>
    </Svg>
)

export const SvgRate = createSvg({
    component: Component,
    originalHeight: 24,
    originalWidth: 25
})
