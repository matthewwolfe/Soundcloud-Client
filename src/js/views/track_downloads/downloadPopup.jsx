import React from 'react';

class DownloadPopup extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            track: {
                title: '',
                username: ''
            },
            fileSize: 0,
            bytesDownloaded: 0,
            isDownloadComplete: false,
            hidden: true
        };
    }

    componentWillMount(){
        this.trackInfoSubscription = window.messenger.subscribe('download-track-info', function(data){
            this.setState({
                track: data.track,
                hidden: false,
                bytesDownloaded: 0,
                isDownloadComplete: false});
        }.bind(this));

        this.fileSizeSubscription = window.messenger.subscribe('download-file-size', function(data){
            this.setState({fileSize: data.size});
        }.bind(this));

        this.chunkLengthSubscription = window.messenger.subscribe('download-chunk-length', function(data){
            this.setState({bytesDownloaded: this.state.bytesDownloaded + data.size});
        }.bind(this));

        this.downloadCompleteSubscription = window.messenger.subscribe('download-complete', function(data){
            this.setState({isDownloadComplete: true});
        }.bind(this));
    }

    componentWillUnmount(){
        this.trackInfoSubscription.remove();
        this.fileSizeSubscription.remove();
        this.chunkLengthSubscription.remove();
        this.downloadCompleteSubscription.remove();
    }

    hidePopup(){
        this.setState({
            hidden: true,
            track: {
                title: '',
                username: ''
            }
        });
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
                        {this.state.track.username}
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