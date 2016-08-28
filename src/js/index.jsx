import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Router, hashHistory} from 'react-router';

// Redux stuff
import reducers from './reducers/app.js';
import routes from './routes';

import SplashScreen from './components/splash_screen/splashScreen.jsx';

// Core stuff
import * as SC from './core/soundcloud/soundCloudSDK';
import { initialize as PLAYER_initialize } from './core/music/player';
import * as Listener from './core/listener';
import * as storageManager from './core/storageManager';
// import * as server from '../core/server/server';

export let store;

render(
    <SplashScreen />,
    document.getElementById('app')
);

// server.load_server();

window.storageManager = storageManager;

window.storageManager.initialize(function(){
    // Initialize the connection to the SoundCloud API and then render the app
    SC.initialize(function(initialState){

        store = createStore(reducers, initialState);

        PLAYER_initialize();
        Listener.initialize();

        render(
            <Provider store={store}>
                {routes}
            </Provider>,

            document.getElementById('app')
        );
    });
});