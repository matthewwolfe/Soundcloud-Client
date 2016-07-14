import React from 'react';

class AutocompleteItem extends React.Component {

    constructor(props){
        super(props);
    }

    handleClick(){
        if(this.props.data.kind === 'track'){
            window.messenger.publish('search-query', {query: this.props.data.output});
        } else if(this.props.data.kind === 'user'){
            window.messenger.publish('user-page-open', {user: this.props.data.entity});
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

export default AutocompleteItem;