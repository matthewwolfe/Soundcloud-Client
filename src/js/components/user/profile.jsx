import React from 'react';

class Profile extends React.Component {

    constructor(props){
        super(props);
    }

    getAvatarUrl(){
        if(this.props.data.avatar_url){
            return this.props.data.avatar_url.replace('large', 't300x300');
        } else {
            return '';
        }
    }

    getLocation(){
        if(this.props.data.country !== null && this.props.data.city !== null){
            return this.props.data.city + ', ' + this.props.data.country;

        } else if(this.props.data.country !== null){
            return this.props.data.country;

        } else if(this.props.data.city !== null){
            return this.props.data.city;

        } else {
            return '';
        }
    }

    render(){
        if(isEmpty(this.props.data)){
            return null;
        }

        return (
            <div id="profile">
                <div className="profile-picture">
                    <img src={this.getAvatarUrl()} />
                </div>

                <div className="info-container">
                    <h1 className="username">
                        {this.props.data.username}
                    </h1>

                    <div className="profile-location">
                        {this.getLocation()}
                    </div>

                    <div className="followers-count">
                        Followers: {this.props.data.followers_count}
                    </div>

                    <div className="followings-count">
                        Following: {this.props.data.followings_count}
                    </div>

                    <div className="description">
                        {this.props.data.description}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;