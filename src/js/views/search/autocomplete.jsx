import React from 'react';

import AutocompleteItem from './autocompleteItem.jsx';

class Autocomplete extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        let autocompleteItems = [];

        for(let i = 0; i < this.props.data.length; i++){
            autocompleteItems.push(
                <AutocompleteItem data={this.props.data[i]} />
            );
        }

        return (
            <div id="autocomplete" className={this.props.hidden ? 'hide' : ''}>
                {autocompleteItems}
            </div>
        );
    }
}

export default Autocomplete;