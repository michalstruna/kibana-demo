import React from 'react'
import Styled from 'styled-components'

import { useActions, useStrings } from '../../Data'
import { login, Credentials } from '..'
import { Color, size } from '../../Style'
import { Form, Field } from '../../Form'
import { FormContextValues } from 'react-hook-form'
import { PrimaryButton } from '../../Layout'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    handleSignUp?: () => void
    handleResetPassword?: () => void
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

const LoginForm = ({ handleSignUp, handleResetPassword, ...props }: Props) => {

    const actions = useActions({ login })
    const strings = useStrings().auth

    const handleSubmit = async (values: Credentials, form: FormContextValues<Credentials>) => {
        const action = await actions.login(values)

        if (action.error) {
            throw strings.error
        }
    }

    return (
        <Root{...props}>
            <Form onSubmit={handleSubmit} defaultValues={{ email: '', password: '' }} buttons={[
                [handleSignUp, strings.signUp],
                [handleResetPassword, strings.resetPassword]
            ]}>
                <Field
                    name='email'
                    type={Field.Type.EMAIL}
                    label={strings.email}
                    required={strings.missingEmail}
                    invalid={strings.invalidEmail} />
                <Field
                    name='password'
                    type={Field.Type.PASSWORD}
                    label={strings.password}
                    required={strings.missingPassword} />
                <Submit>
                    {strings.login}
                </Submit>
            </Form>
        </Root>
    )

}

export default LoginForm