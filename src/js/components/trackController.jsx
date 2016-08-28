import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';


class TrackController extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            title_position: 0,
            isScrolling: false
        };

        this.timer = null;
    }

    componentWillUpdate(nextProps, nextState){
        if(this.props.track && nextProps.track){
            if(nextProps.track.id !== this.props.track.id){
                this.resetState();
            }
        }
    }

    handleUserClick(){
        hashHistory.push('/user/' + this.props.track.user.id);
    }

    resetState(){
        clearInterval(this.timer);
        this.setState({title_position: 0, isScrolling: false});
    }

    handleMouseOver(){
        if(!this.state.isScrolling){
            let titleWidth = document.getElementById('track-title').scrollWidth;

            if(titleWidth > 220){
                this.setScroll(titleWidth);
                this.setState({isScrolling: true});
            }
        }
    }

    setScroll(titleWidth){
        this.timer = setInterval(function(){
            if(this.state.title_position <= -(titleWidth + 5)){
                this.setState({title_position: 220});

            }
            if(this.state.title_position === 1){
                this.resetState();
            }

            this.setState({title_position: this.state.title_position - 1});
        }.bind(this), 40);
    }

    render () {
        if(this.props.isPlaying || this.props.track !== null){
            return (
                <div id="track-controller-container">
                    <div id="track-controller">

                        <img id="track-image"
                             src={!this.props.track.artwork_url ? 'dist/images/default.png' : this.props.track.artwork_url}
                        />

                        <div id="track-title"
                             style={{marginLeft: this.state.title_position}}
                             onMouseOver={this.handleMouseOver.bind(this)}>

                            {this.props.track.title}
                        </div>

                        <div id="track-creator"
                             onClick={this.handleUserClick.bind(this)}>
                             
                             {this.props.track.user.username}
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

const getCurrentlyPlaying = (isPlaying, tracks, track_id) => {
    if(track_id === null){
        return null;
    }
    
    return tracks.filter((track) => track.id === track_id)[0];
};

const mapStateToProps = (state) => {
    return {
        isPlaying: state.player.isPlaying,
        track: getCurrentlyPlaying(state.player.isPlaying, state.tracks, state.player.id),
    };
};

export default connect(
    mapStateToProps
)(TrackController);
