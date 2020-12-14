import React from 'react'

export default (defaultIndex: number | undefined, defaultIsAsc: boolean | undefined) => {

    const [sortedColumn, setColumn] = React.useState(defaultIndex)
    const [isAsc, setAsc] = React.useState(defaultIsAsc)

    const sort = React.useCallback((index: number | undefined) => {
        const isSameSort = index === sortedColumn
        const newIsAsc = isSameSort ? !isAsc : true

        if (isSameSort && !isAsc) {
            setColumn(undefined)
            setAsc(undefined)
        } else {
            setColumn(index)
            setAsc(newIsAsc)
        }
    }, [sortedColumn, isAsc])

    return { sortedColumn, isAsc, sort }

}