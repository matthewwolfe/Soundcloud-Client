import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import App from './containers/app.jsx';

import SplashScreen from './components/splash_screen/splashScreen.jsx';
import UserPage from './containers/userPage.jsx';
import SettingsPage from './containers/settingsPage.jsx';

export default (
	<Router history={hashHistory}>
		<Route path="/"component={App}>
			<Route path="/splash_screen" component={SplashScreen} />
			<Route path="/user/:id" component={UserPage} />
			<Route path="/settings" component={SettingsPage} />
		</Route>
	</Router>
);