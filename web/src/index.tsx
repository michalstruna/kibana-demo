import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'
import { App, DevicesView, HomeView, MeasurementView, SensorsView, Store, GeneratorView } from './Core'
import { History, Redirect, Route, Url } from './Routing'
import UserRole from './User/Constants/UserRole'
import { ResetPasswordView } from './User'

ReactDOM.render(
    <Provider store={Store}>
        <Router history={History}>
            <App>
                <Switch>
                    <Route exact path={Url.HOME} component={HomeView} />
                    <Route role={UserRole.AUTHENTICATED} exact path={Url.DEVICES} component={DevicesView} />
                    <Route role={UserRole.AUTHENTICATED} exact path={Url.SENSORS + '/:deviceId'} component={SensorsView} />
                    <Route role={UserRole.AUTHENTICATED} exact path={Url.MEASUREMENT + '/:sensorId'} component={MeasurementView} />
                    <Route role={UserRole.ADMIN} exact path={Url.GENERATOR} component={GeneratorView} />
                    <Route exact path={Url.RESET_PASSWORD + '/:token'} component={ResetPasswordView} />
                    <Redirect to={{ pathname: Url.HOME}} />
                </Switch>
            </App>
        </Router>
    </Provider>, document.getElementById('app')
)

serviceWorker.unregister()
