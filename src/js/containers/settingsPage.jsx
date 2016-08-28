import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as config from '../core/soundcloud/config';
import DownloadPath from '../components/settings_page/downloadPath.jsx';

class SettingsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            download_path: config.music_download_path,
            isSyncing: false
        };
    }

    render(){
        return (
            <div id="settings-page">
                <Link to="/" className="link pull-right glyphicon glyphicon-remove"></Link>

                <h1>Settings</h1>

                <div className="group-container">
                    <div className="group">
                        <DownloadPath path={this.state.download_path} />
                    </div>
                </div>

                <div className="group-container">
                    <h2>User details</h2>

                    <div className="group">
                        <h4>Username</h4>
                        <p>{this.props.user.username}</p>
                    </div>

                    <div className="group">
                        <h4>First name</h4>
                        <p>{this.props.user.first_name}</p>
                    </div>

                    <div className="group">
                        <h4>Last name</h4>
                        <p>{this.props.user.last_name}</p>
                    </div>

                    <div className="group">
                        <h4>City</h4>
                        <p>{this.props.user.city}</p>
                    </div>

                    <div className="group">
                        <h4>Country</h4>
                        <p>{this.props.user.country_code}</p>
                    </div>

                    <div className="group">
                        <h4>Description</h4>
                        <p>{this.props.user.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    null
)(SettingsPage);