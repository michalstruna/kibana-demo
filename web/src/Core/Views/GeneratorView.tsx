import React from 'react'
import Styled from 'styled-components'
import { FormContextValues } from 'react-hook-form'

import { Dimension, flexCenter, View } from '../../Style'
import { PageTitle, PrimaryButton } from '../../Layout'
import { Field, Form } from '../../Form'
import { useActions, useStrings } from '../../Data'
import { generate } from '../Redux/Slice'

const Root = Styled(View)`
    ${flexCenter()}
    text-align: center;
    height: calc(100vh - ${Dimension.NAV_HEIGHT});
`

interface Values {
    count: number
}

const HomeView = ({ ...props }) => {

    const strings = useStrings().generator
    const actions = useActions({ generate })

    const handleSubmit = async (values: Values, form: FormContextValues<Values>) => {
        const action = await actions.generate(values.count)

        if (action.error) {
            throw strings.error
        }
    }

    return (
        <Root{...props}>
            <Form onSubmit={handleSubmit} defaultValues={{ count: 0 }}>
                <PageTitle>
                    {strings.title}
                </PageTitle>
                <br />
                <Field
                    name='count'
                    type={Field.Type.NUMBER}
                    label={strings.count}
                    required={strings.missingCount} />
                <PrimaryButton>
                    {strings.generate}
                </PrimaryButton>
            </Form>
        </Root>
    )

}

export default HomeView