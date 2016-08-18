import React from 'react';

import { convertDuration } from '../../core/utils';

class MusicPlayerProgressBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hover: false
        };
    }

    mouseOver(){
        this.setState({hover: true});
    }

    mouseOut(){
        this.setState({hover: false});
    }

    trackClick(e){
        var clickPosition = e.pageX - e.target.getBoundingClientRect().left,
            initialPosition = Math.round((clickPosition / 400 * this.props.track.duration) / 1000) * 1000;


        if(initialPosition > 2000){
            initialPosition -= 2000;
        }

        this.props.setPosition(initialPosition);
    }

    render(){
        if(this.props.position === null && this.props.track === undefined){
            return null;
        }

        return (
            <div id="progress-bar">
                <div id="current-time">{convertDuration(this.props.position)}</div>

                <div id="track-timeline"
                     onMouseOver={this.mouseOver.bind(this)}
                     onMouseOut={this.mouseOut.bind(this)}
                     onClick={this.trackClick.bind(this)}>

                    <div id="progress-background"></div>

                    <div id="progress-bar"
                         style={{width: this.props.position / this.props.track.duration * 400 + 'px'}}>
                    </div>

                    <div id="progress-bar-handle"
                         style={{left: this.props.position / this.props.track.duration * 400 + 'px'}}
                         className={(this.state.hover && this.props.isPlaying) ? '' : 'hide'}>
                    </div>
                </div>

                <div id="duration-time">{convertDuration(this.props.track.duration)}</div>
            </div>
        );
    }
}

export default MusicPlayerProgressBar;
