import React from 'react';

class MusicPlayerProgressBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {position: 0, duration: 0, hover: false};
    }

    mouseOver(){
        this.setState({hover: true});
    }

    mouseOut(){
        this.setState({hover: false});
    }

    trackClick(e){
        if(window.music.currentSoundObject !== null){

        var clickPosition = e.pageX - e.target.getBoundingClientRect().left,
            initialPosition = Math.round((clickPosition / 400 * window.music.currentSoundObject.duration) / 1000) * 1000;

        
            if(initialPosition > 2000){
                initialPosition -= 2000;
            }

            window.music.updatePosition(initialPosition);
        }
    }

    render(){
        return null;
        /*
        return (
            <div id="progress-bar">
                <div id="current-time">{window.music.convertDuration(this.state.position)}</div>

                <div id="track-timeline"
                     onMouseOver={this.mouseOver.bind(this)}
                     onMouseOut={this.mouseOut.bind(this)}
                     onClick={this.trackClick.bind(this)}>

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
        */
    }
}

export default MusicPlayerProgressBar;