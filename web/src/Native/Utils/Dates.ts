const fillZero = (value: number): string => (
    value < 10 ? '0' + value : value.toString()
)

export const formatTime = (date: number, s: boolean = false, ms: boolean = false): string => {
    const dateObj = new Date(date)
    let result = fillZero(dateObj.getHours()) + '.' + fillZero(dateObj.getMinutes())

    if (s) {
        result += ':' + fillZero(dateObj.getSeconds())
    }

    if (ms) {
        result += ',' + fillZero(dateObj.getMilliseconds())
    }

    return result
}

export const formatDate = (date: number): string => {
    const obj = new Date(date)

    return `${obj.getDate()}. ${obj.getMonth() + 1}. ${obj.getFullYear()}`
}


export enum Format {
    SHORT,
    EXACT,
    LONG
}

export const daysToMs = (days: number) => { // TODO: convert(10, Unit.DAY, UNIT.MS)
    return days * 86400 * 1000
}