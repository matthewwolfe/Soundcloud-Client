import React from 'react';
import { connect } from 'react-redux';

import { fetchSearchResults } from '../../actions/search';
import { setSelectedSection } from '../../actions/section';

class AutocompleteItem extends React.Component {

    constructor(props){
        super(props);
    }

    handleClick(){
        if(this.props.data.kind === 'track'){
            this.props.fetchSearchResults(this.props.data.output);
        } else if(this.props.data.kind === 'user'){
            this.props.fetchSearchResults(this.props.data.entity.id);
        }
    }

    getTypeClass(){
        if(this.props.data.kind === 'user'){
            return 'glyphicon glyphicon-user';
        } else if(this.props.data.kind === 'track'){
            return 'glyphicon glyphicon-music';
        }
    }

    render(){
        let type = this.getTypeClass();

        return (
            <div onClick={this.handleClick.bind(this)} className="autocomplete-item">
                <div className="title">
                    {this.props.data.output}
                </div>
                <span className={this.getTypeClass()}></span>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearchResults: (query) => {
            dispatch(setSelectedSection('search'));
            fetchSearchResults(query);
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(AutocompleteItem);