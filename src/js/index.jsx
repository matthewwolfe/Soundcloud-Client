import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Router, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Redux stuff
import reducers from './reducers/app.js';
import routes from './routes';

import SplashScreen from './components/splash_screen/splashScreen.jsx';

// Core stuff
import * as SC from './core/soundcloud/soundCloudSDK';
import * as music from './core/music/player.js';
import * as storageManager from './core/storageManager';
// import * as server from '../core/server/server';

export let store;
let history;

render(
    <SplashScreen />,
    document.getElementById('app')
);

// server.load_server();

music.initialize();

window.storageManager = storageManager;

window.storageManager.initialize(function(){
    // Initialize the connection to the SoundCloud API and then render the app
    SC.initialize(function(initialState){

        store = createStore(reducers, initialState);
        history = syncHistoryWithStore(hashHistory, store);

        render(
            <Provider store={store}>
                <Router history={history} routes={routes} />
            </Provider>,

            document.getElementById('app')
        );
    });
});