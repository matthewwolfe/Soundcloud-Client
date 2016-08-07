import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import App from './containers/app.jsx';

import UserPage from './containers/userPage.jsx';
import SettingsPage from './containers/settingsPage.jsx';

export default (
    <Router history={hashHistory}>
        <Route path="/"component={App}>
            <Route path="/user/:id" component={UserPage} />
            <Route path="/settings" component={SettingsPage} />
        </Route>
    </Router>
);