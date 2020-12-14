import React from 'react'
import Styled from 'styled-components'

import { Auth, UnauthMessage } from '../../User'
import UserRole from '../../User/Constants/UserRole'
import { Dimension, flexCenter, image, View } from '../../Style'
import { MinorSectionTitle, PageTitle, SectionTitle } from '../../Layout'

const Root = Styled(View)`
    ${flexCenter()}
    text-align: center;
    height: calc(100vh - ${Dimension.NAV_HEIGHT});
`

const Inner = Styled.div`
    ${image('Core/Icon.svg', 'auto 10rem', 'center top')}
    padding-top: 12rem;
    padding-bottom: 4rem;
    width: 20rem;
`

const Subtitle = Styled(SectionTitle)`
    font-size: 120%;
    font-weight: bold;
`

const Author = Styled(MinorSectionTitle)`
    font-size: 120%;
    font-style: italic;
    opacity: 0.5;
    font-weight: normal;
`

const HomeView = ({ ...props }) => {


    return (
        <Root {...props}>
            <Inner>
                <PageTitle>
                    NNPDA
                </PageTitle>
                <PageTitle>
                    Semestrální práce B
                </PageTitle>
                <Subtitle>
                    Senzory pro měření meteorologických veličin
                </Subtitle>
                <Author>
                    Michal Struna
                </Author>
                <Auth
                    role={UserRole.UNAUTHENTICATED}
                    when={() => <UnauthMessage />}
                    otherwise={() => null} />
            </Inner>
        </Root>
    )

}

export default HomeView