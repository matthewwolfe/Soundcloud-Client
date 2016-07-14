import React from 'react';

class SplashScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hidden: false
        };
    }

    componentWillMount(){
        this.hideSubscription = window.messenger.subscribe('splash-screen-hide', function(data){
            this.setState({hidden: true});
        }.bind(this));
    }

    render(){
        return (
            <div id="splash-screen" className={this.state.hidden ? 'hide' : ''}>
                <img src="dist/images/soundcloud_logo.png" />
            </div>
        );
    }
}

export default SplashScreen;