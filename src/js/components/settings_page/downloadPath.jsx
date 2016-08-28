import React, { Component } from 'react';

class DownloadPath extends Component {

    constructor(props){
        super(props);

        this.state = {
            isEditing: false,
            path: props.path
        };
    }

    enableEditing(){
        if(!this.state.isEditing){
            this.setState({isEditing: true});
        }
    }

    savePath(){
        this.setState({isEditing: false});
    }

    handleInput(e){
        this.setState({path: e.target.value});
    }

    render(){
        return (
            <div>
                <h4>Download directory</h4>

                <p className={this.state.isEditing ? 'hide' : ''}>
                    {this.state.path}
                </p>

                <input type="text"
                       value={this.state.path}
                       onChange={this.handleInput.bind(this)}
                       className={!this.state.isEditing ? 'hide' : ''} /> 

                <span onClick={this.enableEditing.bind(this)}
                      className={this.state.isEditing ? 'hide': 'pull-right glyphicon glyphicon-pencil'}>
                </span>

                <span onClick={this.savePath.bind(this)}
                      className={!this.state.isEditing ? 'hide': 'pull-right glyphicon glyphicon-ok'}>
                </span>
            </div>
        );
    }
}

export default DownloadPath;