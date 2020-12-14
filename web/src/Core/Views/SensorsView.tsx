import React from 'react'
import useRouter from 'use-react-router'

import { getSensors, removeSensor } from '../Redux/Slice'
import { Url } from '../../Routing'
import ListView from '../Components/ListView'
import { Cursor, useStrings } from '../../Data'
import SensorForm from '../Components/SensorForm'

const DevicesView = () => {

    const { match } = useRouter<any>()
    const strings = useStrings().sensor
    const deviceId = match.params.deviceId

    return (
        <ListView
            addForm={<SensorForm />}
            detailPage={Url.MEASUREMENT}
            getItems={(cursor: Cursor) => getSensors([deviceId, cursor])}
            removeItem={removeSensor}
            title={'Seznam senzorů (zařízení ' + match.params.deviceId + ')'}
            columns={[
                { accessor: item => item.name, title: 'Název', width: 1.5, name: 'name' },
                { accessor: item => item.type, title: 'Typ', render: val => strings.types[val], name: 'type' },
            ]} />
    )

}

export default DevicesView