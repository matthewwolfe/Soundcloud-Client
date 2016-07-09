import React from 'react';

class SettingsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hidden: true
        };
    }

    componentWillMount(){
        this.toggleSubscription = window.messenger.subscribe('settings-page-open', function(data){
            this.setState({hidden: false});
        }.bind(this));
    }

    hide(){
        this.setState({hidden: true});
    }

    render(){
        return (
            <div id="settings-page" className={this.state.hidden ? 'hide' : ''}>
                <span onClick={this.hide.bind(this)} className="glyphicon glyphicon-remove"></span>

                <h1>Settings</h1>

                <div className="group-container">
                    <div className="group">
                        <h4>Download directory</h4>
                        <select>
                            <option>Desktop</option>
                            <option>Downloads</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsPage;