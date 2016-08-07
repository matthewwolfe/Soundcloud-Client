import React from 'react';

import Profile from '../components/user/profile.jsx';

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
            this.getUser(data.id);
        }.bind(this));
    }

    getUser(id){
        window.soundCloudAPI.getUserById(id, function(user){
            this.setState({hidden: false, user: user});
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