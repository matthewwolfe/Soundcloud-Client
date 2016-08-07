import React from 'react';

import Autocomplete from './autocomplete.jsx';

import { SC_autocomplete } from '../../core/soundcloud/soundCloudSDK';

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

    search(query){  
        if(query === undefined){
            query = this.state.value;
        }

        this.hideAutocomplete();
    }

    showAutocomplete(){
        this.setState({isAutocompleteHidden: false});
    }

    hideAutocomplete(){
        this.setState({isAutocompleteHidden: true});
    }

    autocomplete(){
        SC_autocomplete(this.state.value, function(results){
            this.setState({autocompleteResults: results});
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