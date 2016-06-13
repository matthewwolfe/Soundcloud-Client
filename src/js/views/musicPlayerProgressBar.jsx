import React from 'react';

class MusicPlayerProgressBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {position: 0, duration: 0, hover: false};

        window.messenger.subscribe('music-position-update', function(data){
            this.setState({position: data.position, duration: data.duration});
        }.bind(this));
    }

    mouseOver(){
        this.setState({hover: true});
    }

    mouseOut(){
        this.setState({hover: false});
    }

    render(){
        return (
            <div id="progress-bar">
                <div id="current-time">{window.music.convertDuration(this.state.position)}</div>

                <div id="track-timeline" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
                    <div id="progress-background"></div>
                    <div id="progress-bar" 
                         style={{width: this.state.position / this.state.duration * 400 + 'px'}}>
                    </div>
                    <div id="progress-bar-handle" 
                         style={{left: this.state.position / this.state.duration * 400 + 'px'}}
                         className={(this.state.hover && window.music.currentlyPlaying !== null) ? '' : 'hide'}>
                    </div>
                </div>

                <div id="duration-time">{window.music.convertDuration(this.state.duration)}</div>
            </div>
        );
    }
}

export default MusicPlayerProgressBar;