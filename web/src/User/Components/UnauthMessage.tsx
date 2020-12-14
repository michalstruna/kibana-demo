import React from 'react'
import Styled from 'styled-components'

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`
    margin-top: 5rem;
`

const LoginForm = ({ ...props }: Props) => {

    return (
        <Root {...props}>
            Pro práci se senzory se přihlašte.
        </Root>
    )

}

export default LoginForm