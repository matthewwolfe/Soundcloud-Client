import React from 'react';

class User extends React.Component {

    constructor(props){
        super(props);

        this.state = {data: {}};
    }

    loadUser(){
        this.setState({data: window.user});
    }

    componentDidMount(){
        this.loadUser();
    }

    render (){
        return (
            <div id="user">
                <img className="profile-picture" src={this.state.data.avatar_url} />
                <h4 className="username">{this.state.data.username}</h4>
                <p className="followers-count">Followers: {this.state.data.followers_count}</p>
                <p className="followings-count">Following: {this.state.data.followings_count}</p>
            </div>
        );
    }
}

export default User;