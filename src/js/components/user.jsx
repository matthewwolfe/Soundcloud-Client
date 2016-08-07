import React from 'react';

const User = ({ user }) => {
    return (
        <div id="user">
            <img className="profile-picture" src={user.avatar_url} />
            <h4 className="username">{user.username}</h4>
            <p className="followers-count">Followers: {user.followers_count}</p>
            <p className="followings-count">Following: {user.followings_count}</p>
        </div>
    );
};

export default User;