import React from 'react'
import Styled from 'styled-components'

import { useActions, useStrings } from '../../Data'
import { signUp, RegistrationData } from '..'
import { Form, Field } from '../../Form'
import { FormContextValues } from 'react-hook-form'
import { PrimaryButton } from '../../Layout'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    handleLogin?: () => void
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

const LoginForm = ({ handleLogin, ...props }: Props) => {

    const actions = useActions({ signUp })
    const strings = useStrings().auth

    const handleSubmit = async (values: RegistrationData, form: FormContextValues<RegistrationData>) => {
        if (values.password !== values.passwordAgain) {
            throw strings.passwordsNotEqual
        } else {
            const action = await actions.signUp(values)

            if (action.error) {
                throw strings.signUpError
            }
        }
    }

    return (
        <Root{...props}>
            <Form onSubmit={handleSubmit} defaultValues={{ email: '', password: '', passwordAgain: '' }} buttons={[
                [handleLogin, strings.signUpToLogin]
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
                <Field
                    name='passwordAgain'
                    type={Field.Type.PASSWORD}
                    label={strings.passwordAgain}
                    required={strings.missingPassword} />
                <Submit>
                    {strings.signUp}
                </Submit>
            </Form>
        </Root>
    )

}

export default LoginForm