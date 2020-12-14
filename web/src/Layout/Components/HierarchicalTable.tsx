import React from 'react'
import Styled, { css } from 'styled-components'

import { useSort } from '../../Data'
import { Color, size, image, Duration, ZIndex } from '../../Style'
import { Column } from '../types'
import { Sort } from '../../Data'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    items: any[]
    columns: Column<any, any>[]
    onSort?: (sort: Partial<Sort>) => void
    defaultSort?: { column: number, isAsc: boolean }
    renderBody?: (body: React.ReactNode) => React.ReactNode
    renderHeader?: (header: React.ReactNode) => React.ReactNode
}

const Root = Styled.div`

`

interface RowProps {
    isOdd?: boolean
}

const Row = Styled.div<RowProps>`    
    align-items: stretch;
    white-space: nowrap;
    min-width: 100%;
    
    ${props => props.isOdd && `
        background-color: rgba(0, 0, 0, 0.15);
    `}
    
    a, button {
        background-color: ${Color.DARKEST};
        height: 2rem;
        line-height: 2rem;
        font-size: 85%;
        margin-right: 0.5rem;
        padding: 0 1rem;
        
        &:hover, &:active {
            background-color: ${Color.DARKEST_HOVER};
        }
    }
`

interface CellProps {
    icon?: string
}

const Cell = Styled.div<CellProps>`
    align-items: center;
    box-sizing: border-box;
    display: inline-flex;
    flex: 1 1 0;
    height: 3.5rem;
    line-height: 3.5rem;
    padding: 1rem;
    position: relative;
    vertical-align: middle;
    transition: background-color ${Duration.MEDIUM};
    
    &:not(:first-of-type):not([data-header]):nth-of-type(2n + 1) {
        background-color: rgba(0, 0, 0, 0.07);
    }
    
    ${props => props.icon && css`
        &:before {
            ${image(undefined)}
            ${size('1.2rem')}
            background-image: url("${props.icon}");
            content: "";
            display: inline-block;
            margin-right: 0.5rem;
            min-width: 1.2rem;
        }
    `}
    
    &[data-sorted]:not([data-header]) {
        &:after {

        }
    }
`

const Header = Styled.div`
    background-color: ${Color.DARKEST};
    position: sticky;
    top: 0;
    z-index: ${ZIndex.TABLE_HEADER};
`

const HeaderRow = Styled(Row)`
    background-color: ${Color.DARKEST};
    position: sticky;
    top: 0;
    z-index: ${ZIndex.TABLE_HEADER};

    ${Cell} {
        background-color: ${Color.DARKEST};
        border-bottom: 2px solid transparent;
        border-top: 2px solid transparent;
        height: 2.5rem;
        cursor: pointer;
        padding: 1.5rem 1rem;
        user-select: none;
        
        &:empty {
            pointer-events: none;
        }
        
        &:hover {
            background-color: ${Color.DARKEST_HOVER};
        }
        
        &:after {
            border: 5px solid transparent;
            content: "";
            display: inline-block;
            margin-left: 0.5rem;
        }
        
        &[data-sorted="asc"] {
            &:after {
                border-top-color: ${Color.LIGHT};
                transform: translateY(25%);
            }
        }
        
        &[data-sorted="desc"] {
            &:after {
                border-bottom-color: ${Color.LIGHT};
                transform: translateY(-25%);
            }
        }
        
        &:first-of-type, &:last-of-type {
            pointer-events: none;
        }
        
     }
`

const getWidth = (width?: number | string) => {
    if (typeof width === 'string') {
        return { width: `${width}` }
    } else {
        return { width: `${(width ?? 1) * 14}rem` }
    }
}

// TODO: Generic types. Current = level == 0 ? T1 : T2?
const HierarchicalTable = ({ columns, items, onSort, defaultSort, renderBody, renderHeader, ...props }: Props) => {

    const { sort, sortedColumn, isAsc } = useSort((defaultSort as any).column, (defaultSort as any).isAsc)

    React.useEffect(() => {
        if (onSort && columns[sortedColumn!]) {
            onSort({ column: sortedColumn, isAsc, columnName: columns[sortedColumn!].name })
        } else if (onSort && sortedColumn === undefined && isAsc === undefined) {
            onSort({})
        }
    }, [sortedColumn, isAsc])

    const renderedHeader = React.useMemo(() => {
        return (
            <Header>
                <HeaderRow>
                    {columns.map((column: Column<any, any>, i) => (
                        <Cell
                            style={getWidth(column.width)}
                            key={i}
                            icon={column.headerIcon || column.icon}
                            data-header
                            data-sorted={sortedColumn === i ? (isAsc ? 'asc' : 'desc') : undefined}
                            onClick={() => sort(i)}>
                            {column.title}
                        </Cell>
                    ))}
                </HeaderRow>
            </Header>
        )
    }, [columns, sort, isAsc, sortedColumn])

    const headerRenderer = renderHeader ? renderHeader : (header: any) => header
    const bodyRenderer = renderBody ? renderBody : (body: any) => body

    return (
        <Root {...props}>
            {headerRenderer(renderedHeader)}
            {bodyRenderer(items.map((item: any, i: number) => (
                <Row key={i} isOdd={i % 2 === 1} data-is-odd={i % 2 === 1}>
                    {columns.map((column, j) => (
                        <Cell key={j} icon={column.icon} data-sorted={sortedColumn === j ? (isAsc ? 'asc' : 'desc') : undefined} style={getWidth(column.width)}>
                            {column.render ? column.render(column.accessor(item, i), item, i) : column.accessor(item, i)}
                        </Cell>
                    ))}
                </Row>
            )))}
        </Root>
    )

}

HierarchicalTable.Cell = Cell
HierarchicalTable.Header = Header
HierarchicalTable.Row = Row

HierarchicalTable.defaultProps = {
    defaultSort: { column: 1, isAsc: true }
}

export default HierarchicalTable