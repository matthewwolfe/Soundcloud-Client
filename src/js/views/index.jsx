import React from 'react';
import {render} from 'react-dom';

import User from './user.jsx';
import SideMenu from './sideMenu.jsx';

class App extends React.Component {

    render () {
        return (
            <div>
                <div id="left-side-bar">
                    <User />
                    <SideMenu />
                </div>

                <div id="music-list">
                </div>
            </div>
        );
    }
}

window.soundCloudAPI = new SoundcloudAPI(function(){
    render(<App/>, document.getElementById('app'));
});