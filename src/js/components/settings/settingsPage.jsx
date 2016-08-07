import React from 'react';

class SettingsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hidden: true,
            download_path: config.music_download_path,
            isSyncing: false
        };
    }

    componentWillMount(){
        this.toggleSubscription = window.messenger.subscribe('settings-page-open', function(data){
            this.setState({hidden: false});
        }.bind(this));
    }

    toggleSync(){
        window.messenger.publish('toggle-sync', {isSyncing: !this.state.isSyncing});
        this.setState({isSyncing: !this.state.isSyncing});
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
                        <p>{this.state.download_path}</p>
                    </div>

                    <div className="group">
                        <h4>Toggle sync</h4>
                        <button className="toggle-button"
                                onClick={this.toggleSync.bind(this)}>

                            {this.state.isSyncing ? 'Stop' : 'Start'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsPage;