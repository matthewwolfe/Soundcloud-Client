import React from 'react';

import AutocompleteItem from './autocompleteItem.jsx';

const Autocomplete = (props) => {
    return (
        <div id="autocomplete" className={props.hidden ? 'hide' : ''}>
            {props.data.map((item, index) =>
                <AutocompleteItem data={item} key={index} hideAutocomplete={props.hideAutocomplete} />
            )}
        </div>
    );
};

export default Autocomplete;