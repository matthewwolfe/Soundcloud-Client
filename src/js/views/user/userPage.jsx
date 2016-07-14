import React from 'react';

import Profile from './profile.jsx';

class UserPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hidden: true,
            user: {}
        };
    }

    componentWillMount(){
        this.toggleSubscription = window.messenger.subscribe('user-page-open', function(data){
            window.messenger.publish('hide-autocomplete', {});
            this.setState({hidden: false, user: data.user});
        }.bind(this));
    }

    hide(){
        this.setState({
            hidden: true,
            user: {}
        });
    }

    render(){
        return (
            <div id="user-page" className={this.state.hidden ? 'hide' : ''}>
                <span onClick={this.hide.bind(this)} className="glyphicon glyphicon-remove"></span>

                <Profile data={this.state.user} />
            </div>
        );
    }
}

export default UserPage;