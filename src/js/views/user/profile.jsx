import React from 'react';

class Profile extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        if(isEmpty(this.props.data)){
            return null;
        }

        return (
            <div id="profile">
                <div className="profile-picture">
                    <img src={this.props.data.avatar_url} />
                </div>

                <div className="username">
                    {this.props.data.username}
                </div>
            </div>
        );
    }
}

export default Profile;