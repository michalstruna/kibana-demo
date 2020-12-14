export type DeviceNew = {
    name: string
    latitude: number
    longitude: number
    altitude: number
}

export type Device = DeviceNew & {
    id: number
}

export type SensorNew = {
    name: string
    type: string
}

export type Sensor = SensorNew & {
    id: number
}

export type MeasuredValue = {
    id: string
    time: number
    value: number
    unit: string
}