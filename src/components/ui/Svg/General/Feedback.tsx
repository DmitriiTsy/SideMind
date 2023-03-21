import React, { FC } from 'react'

import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
        <Rect x="0.5" width="24" height="24" rx="6" fill="#EA4E3D"/>
        <G clip-path="url(#clip0_2394_149712)">
            <Path d="M7.22656 19.1757H16.3984C17.8046 19.1757 18.6172 18.3632 18.6172 16.7538V8.40231L17.3593 9.66012V16.6913C17.3593 17.5038 16.9218 17.9179 16.3828 17.9179H7.25C6.46875 17.9179 6.03125 17.5038 6.03125 16.6913V7.82418C6.03125 7.01168 6.46875 6.58981 7.25 6.58981H14.3672L15.625 5.33199H7.22656C5.60156 5.33199 4.77344 6.14449 4.77344 7.75387V16.7538C4.77344 18.371 5.60156 19.1757 7.22656 19.1757ZM10.0703 14.1132L11.5937 13.4492L18.8906 6.16012L17.8203 5.10543L10.5312 12.3945L9.82813 13.8632C9.76563 13.996 9.92188 14.1757 10.0703 14.1132ZM19.4687 5.58981L20.0312 5.01168C20.2968 4.73043 20.2968 4.35543 20.0312 4.09762L19.8515 3.91012C19.6093 3.66793 19.2265 3.69918 18.9687 3.94918L18.3984 4.51168L19.4687 5.58981Z" fill="white"/>
        </G>
        <Defs>
            <ClipPath id="clip0_2394_149712">
                <Rect width="15.457" height="16.5116" fill="white" transform="translate(4.77344 3.74414)"/>
            </ClipPath>
        </Defs>
    </Svg>
)

export const SvgFeedback = createSvg({
    component: Component,
    originalHeight: 24,
    originalWidth: 25
})
