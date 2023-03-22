import React, { FC } from 'react'

import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
    <Svg fill="none" {...props}>
        <Rect x="0.5" width="24" height="24" rx="6" fill="#9599A3"/>
        <G clip-path="url(#clip0_2394_149734)">
            <Path d="M9.4375 14.2305C9.13281 14.2305 8.90625 14.0117 8.90625 13.7227C8.90625 13.4336 9.13281 13.207 9.4375 13.207H15.5859C15.8828 13.207 16.1094 13.4336 16.1094 13.7227C16.1094 14.0117 15.8828 14.2305 15.5859 14.2305H9.4375ZM9.4375 17.1914C9.13281 17.1914 8.90625 16.9727 8.90625 16.6836C8.90625 16.3945 9.13281 16.168 9.4375 16.168H15.5859C15.8828 16.168 16.1094 16.3945 16.1094 16.6836C16.1094 16.9727 15.8828 17.1914 15.5859 17.1914H9.4375ZM8.35157 20.3711H16.6485C18.2656 20.3711 19.0703 19.5508 19.0703 17.9258V10.832H13.4141C12.4141 10.832 11.9375 10.3555 11.9375 9.35547V3.62109H8.35157C6.74219 3.62109 5.92969 4.44922 5.92969 6.07421V17.9258C5.92969 19.5586 6.73438 20.3711 8.35157 20.3711ZM13.4375 9.76171H18.9766C18.9297 9.4414 18.7031 9.1289 18.3281 8.74609L14.0234 4.36328C13.6562 3.98828 13.3359 3.76172 13.0078 3.70703V9.33984C13.0078 9.62109 13.1484 9.76171 13.4375 9.76171Z" fill="white"/>
        </G>
        <Defs>
            <ClipPath id="clip0_2394_149734">
                <Rect width="13.1406" height="16.7578" fill="white" transform="translate(5.92969 3.62109)"/>
            </ClipPath>
        </Defs>
    </Svg>
)

export const SvgTermsAndConditions = createSvg({
    component: Component,
    originalHeight: 24,
    originalWidth: 25
})
