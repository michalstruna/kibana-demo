import React from 'react'
import Styled from 'styled-components'

import { Color, size, View } from '../../Style'
import { useCursor, useItems } from '../Redux/Selectors'
import { Async } from '../../Async'
import { Column, HierarchicalTable, PageTitle, PrimaryButton, Window } from '../../Layout'
import { Link, Url } from '../../Routing'
import CursorSelector from '../Components/CursorSelector'
import { useActions } from '../../Data'
import { setSort } from '../Redux/Slice'


interface Props extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    title: React.ReactNode
    detailPage: Url
    getItems: any
    removeItem?: any
    columns: Column<any, any>[]
    addForm?: React.ReactNode
}

const Root = Styled(View)`
    
`

const Fixed = Styled.div`
    bottom: 2rem;
    position: fixed;
    right: 2rem;
`

const Add = Styled(PrimaryButton)`
    ${size('2.5rem', '2.5rem', true)}
    box-shadow: 0 0 0.3rem ${Color.DARKEST};
    padding: 0;
`

const Header = Styled.div`
    overflow: hidden;
`

const Title = Styled(PageTitle)`
    float: left;
    margin: 2rem;
`

const ListView = ({ title, getItems, removeItem, columns, addForm, detailPage, ...props }: Props) => {

    const items = useItems('/' + window.location.pathname.split('/')[1])
    let { filter, segment, sort } = useCursor()
    const actions = useActions({ removeItem, setSort })

    return (
        <Root {...props}>
            <Header>
                <Title>
                    {title}
                </Title>
                <CursorSelector />
            </Header>
                <HierarchicalTable
                    renderBody={body => (
                        <Async
                            data={[items, () => getItems({
                                sort: { ...sort, columnName: columns[sort.column - 1] ? columns[sort.column - 1].name : columns[0].name },
                                filter, segment }), [sort.isAsc, sort.column, sort.columnName, segment]]}
                            success={() => body} />
                    )}
                    onSort={actions.setSort}
                    columns={[
                        { accessor: (item, i) => i + 1 + segment.index * segment.size, title: '#', width: 0.25 },
                        ...columns,
                        { accessor: item => item.id, title: 'Akce', render: id => removeItem && (
                            <>
                                <Link pathname={detailPage + '/' + id}>Detail</Link>
                                <button onClick={() => actions.removeItem(id)}>Smazat</button>
                            </>
                        ) }
                    ]}
                    items={items.payload ? items.payload.content : []} />
            {addForm && <Fixed>
                <Window renderButton={() => <Add id='add-button'>+</Add>}>
                    {addForm}
                </Window>
            </Fixed>}
        </Root>
    )

}

export default ListView