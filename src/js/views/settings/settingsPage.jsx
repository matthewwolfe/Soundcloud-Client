import React from 'react';

class SettingsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hidden: true,
            download_path: config.music_download_path
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
                        <p>{this.state.download_path}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsPage;