import { Cursor, FilterData, Pageable, Redux, Segment, Sort } from '../../Data'
import { Requests } from '../../Async'
import { Device, DeviceNew, MeasuredValue, Sensor, SensorNew } from '../types'
import { Query } from '../../Routing'

const Slice = Redux.slice(
    'core',
    {
        devices: Redux.async<Pageable<Device>>(),
        newDevice: Redux.async<DeviceNew>(),
        removedDevice: Redux.async<void>(),
        sensors: Redux.async<Pageable<Sensor>>(),
        newSensor: Redux.async<SensorNew>(),
        removedSensor: Redux.async<void>(),
        measurement: Redux.async<Pageable<MeasuredValue>>(),
        filter: Redux.empty<FilterData>({}),
        sort: Redux.empty<Sort>({}),
        segment: Redux.empty<Segment>({}),
        generator: Redux.async<void>()
    },
    ({ async, set }) => ({
        generate: async<number, void>('generator', count => Requests.post('sensors/data', undefined, { count })),

        getDevices: async<Cursor, Device[]>('devices', cursor =>  Requests.get('devices', undefined, cursor)),

        addDevice: async<DeviceNew, Device>('newDevice', device => Requests.post<Device>('devices', device), {
            onSuccess: (state, action) => {
                state.devices.payload!.content.push(action.payload)
                state.devices.payload!.totalElements++
            }
        }),

        removeDevice: async<string, void>('removedDevice', deviceId => Requests.delete<any>(`devices/${deviceId}`), {
            onSuccess: (state, action) => {
                state.devices.payload!.content = state.devices.payload!.content.filter(device => device.id !== action.meta!.arg)
                state.devices.payload!.totalElements--
            }
        }),

        getSensors: async<[number, Cursor], Sensor[]>('sensors', ([deviceId, cursor]) => Requests.get(`devices/${deviceId}/sensors`, undefined, cursor)),

        addSensor: async<[number, SensorNew], Sensor>('newSensor', ([deviceId, sensor]) => Requests.post<Sensor>(`devices/${deviceId}/sensors`, sensor), {
            onSuccess: (state, action) => {
                state.sensors.payload!.content.push(action.payload)
                state.sensors.payload!.totalElements++
            }
        }),

        removeSensor: async<number, void>('removedSensor', sensorId => Requests.delete<any>(`sensors/${sensorId}`), {
            onSuccess: (state, action) => {
                state.sensors.payload!.content = state.sensors.payload!.content.filter(sensors => sensors.id !== action.meta!.arg)
                state.sensors.payload!.totalElements--
            }
        }),

        getMeasurement: async<[number, Cursor], MeasuredValue[]>('measurement', ([sensorId, cursor]) => Requests.get(`sensors/${sensorId}/data`, undefined, cursor)),

        setFilter: set<FilterData>('filter', {
            /*syncObject: () => ({ // TODO: Validate filter.
                attribute: [Query.FILTER_ATTRIBUTE, () => true, []],
                relation: [Query.FILTER_RELATION, () => true, []],
                value: [Query.FILTER_VALUE, () => true, []]
            })*/
        }),
        setSegment: set<Segment>('segment', {
            syncObject: () => ({
                index: [Query.SEGMENT_START, v => Number.isInteger(v) && v >= 0, 0],
                size: [Query.SEGMENT_SIZE, [5, 10, 20, 50, 100, 200], 20]
            })
        }),
        setSort: set<Partial<Sort>>('sort', {
            syncObject: () => ({
                column: [Query.SORT_COLUMN, v => Number.isInteger(v!) && v! > 0],
                isAsc: [Query.SORT_IS_ASC, [false, true]]
            })
        }),
    })
)

export default Slice.reducer
export const { getDevices, setFilter, setSegment, setSort, addDevice, removeDevice, addSensor, getSensors, removeSensor, getMeasurement, generate } = Slice.actions