import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../reducers/app.js';

import SplashScreen from './splash_screen/splashScreen.jsx';
import App from './app.jsx';

import * as SC from '../core/soundcloud/soundCloudSDK';
import * as music from '../core/music';
import * as storageManager from '../core/storageManager';
// import * as server from '../core/server/server';

let store;

// server.load_server();

// render the splash screen first
// render(<SplashScreen />, document.getElementById('app'));

music.initialize();

window.storageManager = storageManager;

window.storageManager.initialize(function(){
    // Initialize the connection to the SoundCloud API and then render the app
    SC.initialize(function(initialState){
    	store = createStore(reducers, initialState);

        // just override the splash screen with the app
        render(
        	<Provider store={store}>
        		<App />
        	</Provider>,

        	document.getElementById('app')
        );
    });
});