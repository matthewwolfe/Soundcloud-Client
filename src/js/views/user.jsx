import React from 'react';

class User extends React.Component {

    constructor(props){
        super(props);

        this.state = {data: {}};
    }

    loadUser(){
        let that = this;

        window.soundCloudAPI.getMe(function(response){
            that.setState({data: response});

            console.log(that.state);
        });
    }

    componentDidMount(){
        this.loadUser();
    }

    render () {
        return (
            <div>
                <h1>{this.state.data.username}</h1>
            </div>
        );
    }
}

export default User;