import React from 'react'

import { getDevices, removeDevice } from '../Redux/Slice'
import { Url } from '../../Routing'
import DeviceForm from '../Components/DeviceForm'
import ListView from '../Components/ListView'

const DevicesView = () => {

    return (
        <ListView
            addForm={<DeviceForm />}
            detailPage={Url.SENSORS}
            getItems={getDevices}
            removeItem={removeDevice}
            title='Seznam zařízení'
            columns={[
                { accessor: item => item.name, title: 'Název', width: 1.5, name: 'name' },
                { accessor: item => item.latitude, title: 'Zeměpisná šířka', render: val => val + '°', name: 'latitude' },
                { accessor: item => item.longitude, title: 'Zeměpisná délka', render: val => val + '°', name: 'longitude' },
                { accessor: item => item.altitude, title: 'Nadmořská výška', render: val => val + ' m', name: 'altitude' },
            ]} />
    )

}

export default DevicesView