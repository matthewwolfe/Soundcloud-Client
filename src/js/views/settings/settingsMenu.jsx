import React from 'react';

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

    openSettingsPage(){
        this.toggleHidden();
        window.messenger.publish('settings-page-open', {});
    }

    openDownloadedMusicDirectory(){
        this.toggleHidden();
        node.electron.shell.openItem(config.music_download_path);
    }

    clearCache(){
        this.toggleHidden();
        window.dataManager.clear();
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
                        <li onClick={this.openSettingsPage.bind(this)}>Settings</li>
                        <li onClick={this.openDownloadedMusicDirectory.bind(this)}>View downloads</li>
                        <li onClick={this.clearCache.bind(this)}>Clear stored data</li>
                        <li onClick={this.logout.bind(this)}>Logout</li>
                    </ul>
                </div>
            </span>
        )
    }
}

export default SettingsMenu;