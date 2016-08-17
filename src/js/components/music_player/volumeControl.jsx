import React from 'react';

class VolumeControl extends React.Component {

    constructor(props){
        super(props);
    }

    handleClick(e){
        let volume = e.pageX - e.target.getBoundingClientRect().left;
        this.props.setVolume(volume);
    }

    render(){
        return (
            <div id="volume-controller" onClick={this.handleClick.bind(this)}>
                <div id="volume-background"></div>

                <div id="volume-bar" style={{width: this.props.volume + 'px'}}>
                </div>

                <div id="volume-bar-handle" style={{left: this.props.volume - 4 + 'px'}}>
                </div>
            </div>
        );
    }
}

export default VolumeControl;
