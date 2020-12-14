import { useSelector } from 'react-redux'
import { Url } from '../../Routing'
import { Cursor } from '../../Data'

export const useDevices = () => useSelector((state: any) => state.core.devices)
export const useNewDevice = () => useSelector((state: any) => state.core.newDevice)
export const useRemovedDevice = () => useSelector((state: any) => state.core.removedDevice)

export const useSensors = () => useSelector((state: any) => state.core.sensors)
export const useNewSensor = () => useSelector((state: any) => state.core.newSensor)
export const useRemovedSensor = () => useSelector((state: any) => state.core.removedSensor)

export const useMeasurement = () => useSelector((state: any) => state.core.measurement)

export const useItems = (table: string) => useSelector(({ core }: any) => {
    switch (table) {
        case Url.DEVICES:
            return core.devices
        case Url.SENSORS:
            return core.sensors
        case Url.MEASUREMENT:
            return core.measurement
    }

    return core.devices
})

export const useCursor = () => useSelector(({ core }: any): Cursor => ({
    sort: core.sort,
    segment: core.segment,
    filter: core.filter
}))