import React, { FC } from 'react'

import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
    <Svg fill="none" {...props}>
        <Rect x="0.5" width="24" height="24" rx="6" fill="#59A6D7"/>
        <G clip-path="url(#clip0_2394_149745)">
            <Path d="M8.92578 19.457H16.0742C17.2227 19.457 17.8321 18.832 17.8321 17.5977V12.2148C17.8321 10.9805 17.2227 10.3633 16.0742 10.3633H8.92578C7.77734 10.3633 7.16797 10.9805 7.16797 12.2148V17.5977C7.16797 18.832 7.77734 19.457 8.92578 19.457ZM8.53516 10.9648H9.77735V8.32422C9.77735 6.35547 11.0352 5.3086 12.4961 5.3086C13.957 5.3086 15.2305 6.35547 15.2305 8.32422V10.9648H16.4648V8.4961C16.4648 5.5586 14.543 4.12891 12.4961 4.12891C10.457 4.12891 8.53516 5.5586 8.53516 8.4961V10.9648Z" fill="white"/>
        </G>
        <Defs>
            <ClipPath id="clip0_2394_149745">
                <Rect width="10.6641" height="15.7422" fill="white" transform="translate(7.16797 4.12891)"/>
            </ClipPath>
        </Defs>
    </Svg>
)

export const SvgPrivacyPolicy = createSvg({
    component: Component,
    originalHeight: 24,
    originalWidth: 25
})
