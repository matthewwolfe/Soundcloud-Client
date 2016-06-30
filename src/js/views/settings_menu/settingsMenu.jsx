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

    clearCache(){
        window.dataManager.clear();
        this.toggleHidden();
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
                        <li onClick={this.clearCache.bind(this)}>Clear stored data</li>
                        <li onClick={this.logout.bind(this)}>Logout</li>
                    </ul>
                </div>
            </span>
        )
    }
}

export default SettingsMenu;