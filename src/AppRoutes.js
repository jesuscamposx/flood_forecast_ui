import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App'
import Home from './pages/Home'
import Sensors from './pages/Sensors'
import Forecast from './pages/Forecast'

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sensores" component={Sensors} />
            <Route exact path='/pronostico' component={Forecast}/>
        </Switch>
    </App>

export default AppRoutes;