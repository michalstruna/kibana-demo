import React from 'react'
import Styled from 'styled-components'

import Auth from './Auth'
import UserRole from '../Constants/UserRole'
import { Window, IconText, PrimaryButton } from '../../Layout'
import { useIdentity } from '../index'
import AuthForm from './AuthForm'
import { useActions, useStrings } from '../../Data'
import { logout } from '../Redux/Slice'

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const UserPreview = Styled.div`
    padding: 1rem;
    white-space: nowrap;
`

const LogoutButton = Styled(PrimaryButton)`
    font-size: 90%;
    white-space: nowrap;
`

const AuthControl = ({ ...props }: Props) => {

    const identity = useIdentity()
    const actions = useActions({ logout })
    const strings = useStrings().auth

    return (
        <Auth
            role={UserRole.UNAUTHENTICATED}
            when={() => (
                <Window renderButton={() => <IconText icon='User/User.svg' text='Přihlášení' onClick={() => null} />}>
                    <AuthForm />
                </Window>
            )}
            otherwise={() => (
                <Window renderButton={() => <IconText
                    icon='User/User.svg'
                    text={identity.payload.name}
                    onClick={() => null} />}>
                    <UserPreview>
                        Role: {strings.roles[identity.payload.role]}
                        <br /><br />
                        <LogoutButton onClick={() => actions.logout()}>
                            Odhlásit se
                        </LogoutButton>
                    </UserPreview>
                </Window>
            )} />
    )

}

export default AuthControl