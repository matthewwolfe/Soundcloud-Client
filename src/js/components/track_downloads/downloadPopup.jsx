import React from 'react';
import { connect } from 'react-redux';

import { hideDownloader } from '../../actions/downloader';


const DownloadPopup = (props) => {
    return (
        <div id="download-popup" className={props.hidden ? 'hide' : ''}>
            <span className="glyphicon glyphicon-remove"
                  onClick={props.hide}>
            </span>

            <div className="track-info">
                <div className="track-title">
                    {props.track.title}
                </div>

                <div className="track-username">
                    {props.track.user.username}
                </div>
            </div>

            <div className="progress-bar-container">
                <div className="progress-background"></div>
                <div className="progress-bar" style={{width: props.progress + '%'}}>
                </div>
            </div>

            <div className={props.progress === 100 ? 'download-complete' : 'hide'}>
                Download complete!
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        track: state.downloader.track,
        progress: state.downloader.progress,
        hidden: state.downloader.hidden
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hide: () => {
            dispatch(hideDownloader());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadPopup);