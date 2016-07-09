import React from 'react';

import NotificationsMenu from './notifications/notifications_menu/notificationsMenu.jsx';
import SettingsMenu from './settings/settingsMenu.jsx';

class SearchBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            value: ''
        };
    }

    search(){
        window.soundCloudAPI.search(this.state.value, function(response){
            window.messenger.publish('search-results', {tracks: response});
        });
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    handleKeyPress(e){
        if(e.which === 13){
            if(this.state.value.length >= 3){
                this.search();
            }
        }
    }

    render(){
        return (
            <div id="search-bar">
                <input type="text" 
                       placeholder="Search" 
                       onKeyPress={this.handleKeyPress.bind(this)} 
                       value={this.state.value}
                       onChange={this.handleChange.bind(this)} />

                <SettingsMenu />
                <NotificationsMenu />
            </div>
        );
    }
}

export default SearchBar;