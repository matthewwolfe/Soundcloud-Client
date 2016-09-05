import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { getUser } from '../actions/users';

import Profile from '../components/user/profile.jsx';

class UserPage extends React.Component {

    constructor(props){
        super(props);

        // the split/pop returns the id in /:user/:id
        user_id = parseInt(this.props.location.pathname.split("/").pop());
        this.props.fetchUser(user_id);
    }

    render(){
        return (
            <div id="user-page">
                <Link to="/" className="link pull-right glyphicon glyphicon-remove"></Link>

                {this.props.user === undefined ? '' : 
                    <Profile user={this.props.user} />
                }
            </div>
        );
    }
}

let user_id;

const mapStateToProps = (state) => {
    return {
        user: state.users.filter((user) => user.id  === user_id)[0]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (id) => {
            dispatch(getUser(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage);