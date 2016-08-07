import React from 'react';

class TrackController extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            track: {},
            playing: false,
            title_position: 0,
            isScrolling: false
        };

        this.timer = null;
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
                this.setState({title_position: 0, isScrolling: false});
                clearInterval(this.timer);
            }

            this.setState({title_position: this.state.title_position - 1});
        }.bind(this), 40);
    }

    usernameOnClick(){
    }

    render () {

        if(this.state.playing){ 
            return (
                <div id="track-controller-container">
                    <div id="track-controller">

                        <img id="track-image"
                             src={!this.state.track.artwork_url ? 'dist/images/default.png' : this.state.track.artwork_url}
                        />

                        <div id="track-title"
                             style={{marginLeft: this.state.title_position}}
                             onMouseOver={this.handleMouseOver.bind(this)}>

                            {this.state.track.title}
                        </div>

                        <div id="track-creator"
                             onClick={this.usernameOnClick.bind(this)}>

                             {this.state.track.user.username}
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default TrackController;