import React from 'react'
import { Route as RouterRoute, RouteProps } from 'react-router-dom'

import { Url } from './Link'
import Redirect from './Redirect'
import UserRole from '../../User/Constants/UserRole'
import { useIdentity } from '../../User/Redux/Selectors'

interface Static {

}

interface Props extends RouteProps {
    role?: UserRole
    component: any
}

const Route: React.FC<Props> & Static = ({ component : Component, role, ...props }) => {

    const identity = useIdentity()

    return (
        <RouterRoute
            {...props}
            render={props => (
                !role || (identity.payload && identity.payload.role >= role) ? <Component {...props} /> : <Redirect to={{ pathname: Url.HOME }} />
            )} />
    )

}

export default Route