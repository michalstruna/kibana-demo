import React from 'react'

export interface Column<TItem, TValue> {
    title: React.ReactNode
    accessor: (item: TItem, index: number) => React.ReactNode
    render?: (value: TValue, item: TItem, index: number) => React.ReactNode
    icon?: string
    headerIcon?: string
    width?: number | string
    interactive?: boolean // TODO: Remove?
    name?: string
}