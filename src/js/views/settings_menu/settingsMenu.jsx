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

    logout(){
        window.messenger.publish('logout', {});
    }

    render(){
        return (
            <span>
                <span className="glyphicon glyphicon-cog" 
                      id="settings-button"
                      onClick={this.toggleHidden.bind(this)}>
                </span>

                <div id="settings-menu" className={this.state.hidden ? 'hide' : ''}>
                    <ul>
                        <li onClick={this.clearCache}>Clear stored data</li>
                        <li onClick={this.logout}>Logout</li>
                    </ul>
                </div>
            </span>
        )
    }
}

export default SettingsMenu;