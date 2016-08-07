import React from 'react';

class DownloadPopup extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            track: {
                title: '',
                user: {
                    username: ''
                }
            },
            fileSize: 0,
            bytesDownloaded: 0,
            isDownloadComplete: false,
            hidden: true
        };

        this.timer = null;
    }

    setTimerToHidePopup(){
        this.timer = setInterval(this.hidePopup.bind(this), 5000);
    }

    clearTimer(){
        if(this.timer !== null){
            clearInterval(this.timer);
        }
    }

    hidePopup(){
        this.setState({
            hidden: true,
            track: {
                title: '',
                user: {
                    username: ''
                }
            }
        });

        this.clearTimer();
    }

    render(){
        let progressWidth = 0;

        progressWidth = (this.state.bytesDownloaded / this.state.fileSize) * 100;

        return (
            <div id="download-popup" className={this.state.hidden ? 'hide' : ''}>
                <span className="glyphicon glyphicon-remove" onClick={this.hidePopup.bind(this)}></span>

                <div className="track-info">
                    <div className="track-title">
                        {this.state.track.title}
                    </div>

                    <div className="track-username">
                        {this.state.track.user.username}
                    </div>
                </div>

                <div className="progress-bar-container">

                    <div className="progress-background"></div>

                    <div className="progress-bar" style={{width: progressWidth + '%'}}>
                    </div>
                </div>

                <div className={this.state.isDownloadComplete ? 'download-complete' : 'hide'}>
                    Download complete!
                </div>
            </div>
        );
    }
}

export default DownloadPopup;