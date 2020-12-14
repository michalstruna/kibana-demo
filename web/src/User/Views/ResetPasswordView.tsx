import React from 'react'
import Styled from 'styled-components'

import { Dimension, flexCenter, View } from '../../Style'
import { PageTitle, PrimaryButton } from '../../Layout'
import { Field, Form } from '../../Form'
import { useActions, useStrings } from '../../Data'
import { resetPassword } from '../Redux/Slice'
import { Url, Urls } from '../../Routing'
import useRouter from 'use-react-router'

const Root = Styled(View)`
    ${flexCenter()}
    text-align: center;
    height: calc(100vh - ${Dimension.NAV_HEIGHT});
`

type Values = {
    password: string
    passwordAgain: string
}

const ResetPasswordView = ({ ...props }) => {

    const strings = useStrings().auth
    const actions = useActions({ resetPassword })
    const { match } = useRouter<any>()

    const handleSubmit = async (values: Values) => {
        if (values.password !== values.passwordAgain) {
            throw strings.passwordsNotEqual
        } else {
            const action = await actions.resetPassword({ token: match.params.token || '', password: values.password })

            if (action.error) {
                throw strings.invalidToken
            } else {
                Urls.replace({ pathname: Url.HOME })
            }
        }
    }

    return (
        <Root{...props}>
            <Form onSubmit={handleSubmit} defaultValues={{ password: '', passwordAgain: '' }}>
                <PageTitle>
                    {strings.title}
                </PageTitle>
                <br />
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
                <PrimaryButton>
                    {strings.resetPassword}
                </PrimaryButton>
            </Form>
        </Root>
    )

}

export default ResetPasswordView