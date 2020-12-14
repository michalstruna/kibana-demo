import React from 'react'
import Styled from 'styled-components'

import { Field, FieldType, Form } from '../../Form'
import { useActions, useStrings } from '../../Data'
import { addDevice, DeviceNew, useNewDevice } from '..'
import { Async } from '../../Async'
import { PrimaryButton, Window } from '../../Layout'
import { FormContextValues } from 'react-hook-form'
import { Credentials } from '../../User'

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

const DeviceForm: React.FC<Props> & Static = ({ ...props }) => {

    const strings = useStrings().device
    const actions = useActions({ addDevice })
    const newTopic = useNewDevice()

    const handleSubmit = async (values: DeviceNew, form: FormContextValues<Credentials>) => {
        const action = await actions.addDevice(values)

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
                {strings.newDevice}
            </h3>
            <Field
                type={FieldType.TEXT}
                name='name'
                label={strings.name}
                required={strings.missingName} />
            <Field
                type={FieldType.NUMBER}
                name='latitude'
                label={strings.latitude}
                required={strings.missingLatitude} />
            <Field
                type={FieldType.NUMBER}
                name='longitude'
                label={strings.longitude}
                required={strings.missingLongitude} />
            <Field
                type={FieldType.NUMBER}
                name='altitude'
                label={strings.altitude}
                required={strings.missingAltitude} />
            <Submit>
                {strings.addSubmit}
            </Submit>
            <Async data={[newTopic]} fail={() => null} />
        </Root>
    )

}

export default DeviceForm