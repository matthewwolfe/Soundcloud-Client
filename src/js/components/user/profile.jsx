import React, {PropTypes} from 'react';

const Profile = ({user}) => {
    return (
        <div id="profile">
            <div className="profile-picture">
                <img src={user.avatar_url} />
            </div>

            <div className="info-container">
                <h1 className="username">
                    {user.username}
                </h1>

                <div className="profile-location">
                    {user.location}
                </div>

                <div className="followers-count">
                    Followers: {user.followers_count}
                </div>

                <div className="followings-count">
                    Following: {user.followings_count}
                </div>

                <div className="description">
                    {user.description}
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    avatar_url: PropTypes.string.required,
    username: PropTypes.string.required,
    location: PropTypes.string.required,
    followers_count: PropTypes.number.required,
    followings_count: PropTypes.number.required,
    description: PropTypes.string.required
};

export default Profile;