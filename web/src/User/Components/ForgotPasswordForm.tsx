import React from 'react'
import Styled from 'styled-components'
import { FormContextValues } from 'react-hook-form'

import { useActions, useStrings } from '../../Data'
import { ForgotPasswordData, forgotPassword } from '..'
import { Form, Field } from '../../Form'
import { PrimaryButton } from '../../Layout'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    handleLogin?: () => void
    handleSignUp?: () => void
}

const Root = Styled.div`
    box-sizing: border-box;
    padding: 1rem;
    text-align: center;
    width: 18rem;
`

const Submit = Styled(PrimaryButton)`
    font-size: 100%;
`

const LoginForm = ({ handleLogin, handleSignUp, ...props }: Props) => {

    const actions = useActions({ forgotPassword })
    const strings = useStrings().auth

    const handleSubmit = async (values: ForgotPasswordData) => {
        const action = await actions.forgotPassword(values.email)

        if (action.error) {
            throw strings.error
        }
    }

    return (
        <Root{...props}>
            <Form onSubmit={handleSubmit} defaultValues={{ email: '' }} buttons={[
                [handleLogin, strings.login],
                [handleSignUp, strings.signUp]
            ]}>
                <Field
                    name='email'
                    type={Field.Type.EMAIL}
                    label={strings.email}
                    required={strings.missingEmail}
                    invalid={strings.invalidEmail} />
                <Submit>
                    {strings.resetPassword}
                </Submit>
            </Form>
        </Root>
    )

}

export default LoginForm