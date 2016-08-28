import React from 'react';
import { Link } from 'react-router';

import * as config from '../../core/soundcloud/config';


class SettingsMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hidden: true
        };
    }
    
    toggleHidden(){
        this.setState({hidden: !this.state.hidden});
    }

    openDownloadedMusicDirectory(){
        this.toggleHidden();
        config.node.electron.shell.openItem(config.music_download_path);
    }

    logout(){
        this.toggleHidden();
        window.messenger.publish('logout', {});
    }

    render(){
        return (
            <span>
                <span className="glyphicon glyphicon-cog" 
                      id="settings-button"
                      onClick={this.toggleHidden.bind(this)}>
                </span>

                <div id="settings-menu"
                     className={this.state.hidden ? 'hide' : ''}>
                    <ul>
                        <li onClick={this.toggleHidden.bind(this)}>
                            <Link to="settings" className="link">Settings</Link>
                        </li>

                        <li onClick={this.openDownloadedMusicDirectory.bind(this)}>
                            View downloads
                        </li>

                        <li onClick={this.logout.bind(this)}>
                            Logout
                        </li>
                    </ul>
                </div>
            </span>
        )
    }
}

export default SettingsMenu;