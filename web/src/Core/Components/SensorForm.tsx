import React from 'react'
import Styled from 'styled-components'

import { Field, FieldType, Form } from '../../Form'
import { useActions, useStrings } from '../../Data'
import { addSensor, DeviceNew, SensorNew, useNewSensor } from '..'
import { Async } from '../../Async'
import { PrimaryButton, Window } from '../../Layout'
import { FormContextValues } from 'react-hook-form'
import { Credentials } from '../../User'
import useRouter from 'use-react-router'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'form'> {

}

const Root = Styled(Form)`
    box-sizing: border-box;
    padding: 1rem;
    width: 15rem;
    max-width: 100%;
    
    h3 {
        text-align: center;
    }
`

const Submit = Styled(PrimaryButton)`
    font-size: 100%;
`

const SensorForm: React.FC<Props> & Static = ({ ...props }) => {

    const { match } = useRouter<any>()
    const deviceId = match.params.deviceId
    const strings = useStrings().sensor
    const actions = useActions({ addSensor })
    const newSensor = useNewSensor()

    const handleSubmit = async (values: SensorNew, form: FormContextValues<SensorNew>) => {
        const action = await actions.addSensor([deviceId, values])

        if (!action.error) {
            Window.hideCurrent?.()
        } else {
            form.setError(Form.GLOBAL_ERROR, strings.addError)
        }

        return action
    }

    return (
        <Root {...props} id='add-topic-form' onSubmit={handleSubmit} defaultValues={{ name: '', altitude: 0, latitude: 0, longitude: 0 }}>
            <h3>
                {strings.newSensor}
            </h3>
            <Field
                type={FieldType.TEXT}
                name='name'
                label={strings.name}
                required={strings.missingName} />
            <Field
                type={FieldType.SELECT}
                options={Object.keys(strings.types).map(value => ({ value, text: strings.types[value] }))}
                name='type'
                label={strings.type} />
            <Submit>
                {strings.addSubmit}
            </Submit>
            <Async data={[newSensor]} fail={() => null} />
        </Root>
    )

}

export default SensorForm