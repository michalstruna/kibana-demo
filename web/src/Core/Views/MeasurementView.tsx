import React from 'react'
import useRouter from 'use-react-router'

import { getMeasurement } from '../Redux/Slice'
import { Url } from '../../Routing'
import ListView from '../Components/ListView'
import { Cursor } from '../../Data'

const MeasurementView = () => {

    const { match } = useRouter<any>()
    const sensorId = match.params.sensorId

    return (
        <ListView
            detailPage={Url.MEASUREMENT}
            getItems={(cursor: Cursor) => getMeasurement([sensorId, cursor])}
            title={'Naměřené hodnoty (senzor ' + sensorId + ')'}
            columns={[
                { accessor: item => item.value, title: 'Hodnota', render: (val, item) => (Math.round(val * 100) / 100) + ' ' + item.unit, name: 'value' },
                { accessor: item => item.time, title: 'Datum a čas', render: val => new Date(val).toLocaleString(), name: 'time' },
            ]} />
    )

}

export default MeasurementView