import React from 'react';
import {render} from 'react-dom';

import SplashScreen from './splash_screen/splashScreen.jsx';
import App from './app.jsx';


// initialize the publish/subscribe messenger
window.messenger = new Messenger();

// render the splash screen first
render(<SplashScreen />, document.getElementById('app'));

/* Do all the initialization now that the splash screen is rendered */
window.dataManager = new DataManager();

// Initialize the music handler
window.music = new Music();

window.storageManager = new StorageManager(function(){
    // Initialize the connection to the SoundCloud API and then render the app
    window.soundCloudAPI = new SoundcloudSDK(function(){
        // just override the splash screen with the app
        render(<App />, document.getElementById('app'));
    });
});