import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../reducers/app.js';

import SplashScreen from './splash_screen/splashScreen.jsx';
import App from './app.jsx';

import * as SC from '../core/soundcloud/soundCloudSDK';

let store;

// initialize the publish/subscribe messenger
window.messenger = new Messenger();

load_server();

// render the splash screen first
render(<SplashScreen />, document.getElementById('app'));

/* Do all the initialization now that the splash screen is rendered */
window.dataManager = new DataManager();

// Initialize the music handler
window.music = new Music();

window.storageManager = new StorageManager(function(){
    // Initialize the connection to the SoundCloud API and then render the app
    window.soundCloudAPI = new SoundcloudSDK(function(initialState){
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