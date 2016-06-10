import React from 'react';

class MusicPlayerProgressBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {position: 0, duration: 0};

        window.messenger.subscribe('music-position-update', function(data){
            this.setState({position: data.position, duration: data.duration});
        }.bind(this));
    }

    render(){
        return (
            <div id="progress-bar">
                <div id="current-time">{window.music.convertDuration(this.state.position)}</div>

                <div id="track-timeline">
                    <div id="progress-background"></div>
                    <div id="progress-bar"></div>
                    <div id="progress-bar-handle"></div>
                </div>

                <div id="duration-time">{window.music.convertDuration(this.state.duration)}</div>
            </div>
        );
    }
}

export default MusicPlayerProgressBar;