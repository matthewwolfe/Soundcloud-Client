import React from 'react';

import Autocomplete from './autocomplete.jsx';

import NotificationsMenu from '../notifications/notifications_menu/notificationsMenu.jsx';
import SettingsMenu from '../settings/settingsMenu.jsx';

class SearchBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            value: '',
            autocompleteResults: [],
            isAutocompleteHidden: true
        };
    }

    componentWillMount(){
        this.receiveSearchQuerySubscription = window.messenger.subscribe('search-query', function(data){
            this.search(data.query);
        }.bind(this));

        this.hideAutocompleteSubscription = window.messenger.subscribe('hide-autocomplete', function(data){
            this.hideAutocomplete();
        }.bind(this));
    }

    componentWillUnmount(){
        this.receiveSearchQuerySubscription.remove();
        this.hideAutocompleteSubscription.remove();
    }

    search(query){  
        if(query === undefined){
            query = this.state.value;
        }

        this.hideAutocomplete();

        window.soundCloudAPI.search(query, function(response){
            window.messenger.publish('search-results', {tracks: response});
        });
    }

    showAutocomplete(){
        this.setState({isAutocompleteHidden: false});
    }

    hideAutocomplete(){
        this.setState({isAutocompleteHidden: true});
    }

    autocomplete(){
        window.soundCloudAPI.autocomplete(this.state.value, function(response){
            this.setState({autocompleteResults: response});
        }.bind(this));
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    handleKeyUp(e){
        if(e.which !== 13){
            if(this.state.value.length >= 3){
                this.showAutocomplete();
                this.autocomplete();
            } else {
                this.hideAutocomplete();
            }
        }
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
                       onKeyUp={this.handleKeyUp.bind(this)} 
                       value={this.state.value}
                       onChange={this.handleChange.bind(this)} />

                <Autocomplete data={this.state.autocompleteResults} hidden={this.state.isAutocompleteHidden} />

                <SettingsMenu />
                <NotificationsMenu />
            </div>
        );
    }
}

export default SearchBar;