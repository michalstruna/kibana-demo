import React from 'react'
import Styled from 'styled-components'

import { Dimension, size } from '../../Style'
import { useStrings } from '../../Data'
import { IconText } from '../../Layout'
import useRouter from 'use-react-router'
import { Auth } from '../../User'
import UserRole from '../../User/Constants/UserRole'
import { Url } from '../../Routing'

interface Props extends React.ComponentPropsWithoutRef<'nav'> {

}

const Root = Styled.nav`
    ${size('35rem', Dimension.NAV_HEIGHT, true)}
    display: flex;
    justify-content: space-around;
    user-select: none;
    text-align: center;
`

const Nav = ({ ...props }: Props) => {

    const strings = useStrings().nav
    const { location } = useRouter()

    return (
        <Root {...props}>
            {strings.links.map(({ text, icon, ...link }: any, i: number) => (
                <IconText key={i} icon={`Core/Nav/${icon}.svg`} text={text} {...link} />
            ))}
            <Auth
                role={UserRole.UNAUTHENTICATED}
                otherwise={() => (
                    strings.authLinks.map(({ text, icon, ...link }: any, i: number) => (
                        <IconText key={i} icon={`Core/Nav/${icon}.svg`} text={text} {...link} />
                    ))
                )} />
            <Auth
                role={UserRole.ADMIN}
                when={() => (
                    strings.adminLinks.map(({ text, icon, ...link }: any, i: number) => (
                        <IconText key={i} icon={`Core/Nav/${icon}.svg`} text={text} {...link} />
                    ))
                )} />
        </Root>
    )

}

export default Nav