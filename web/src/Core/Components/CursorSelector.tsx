import React from 'react'
import Styled from 'styled-components'

import { Paginator, useActions } from '../../Data'
import { useCursor, useItems } from '../Redux/Selectors'
import { setFilter, setSegment } from '../Redux/Slice'

interface Props extends React.ComponentPropsWithRef<'div'> {

}

const Root = Styled.div`
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 1rem auto;
    max-width: calc(100% - 2rem);
    
    & > * {
        width: 33.33%;
    }
`

const Page = Styled(Paginator)`
    min-width: 28rem;
`

const CursorSelector = ({ ...props }: Props) => {

    const { segment, filter } = useCursor()
    const actions = useActions({ setSegment, setFilter })

    const root = React.useRef()
    const items = useItems('/' + window.location.pathname.split('/')[1])

    return (
        <Root {...props} ref={root as any}>
            <Page
                page={segment}
                itemsCount={items.payload ? items.payload.totalElements : 0}
                onChange={actions.setSegment}
                freeze={items.pending} />
        </Root>
    )

}

export default CursorSelector