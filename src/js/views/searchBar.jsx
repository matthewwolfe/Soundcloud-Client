import React from 'react';

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

    logout(){
        window.messenger.publish('logout', {});
    }

    render(){
        return (
            <div id="search-bar">
                <input type="text" 
                       placeholder="Search" 
                       onKeyPress={this.handleKeyPress.bind(this)} 
                       value={this.state.value}
                       onChange={this.handleChange.bind(this)} />

                <p className="logout" onClick={this.logout}>Logout</p>
            </div>
        );
    }
}

export default SearchBar;