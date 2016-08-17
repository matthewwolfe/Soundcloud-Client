import React, { PropTypes } from 'react';

const VolumeControl = (props) => {
    return (
        <div id="volume-controller" onClick={(e) => {
            let volume = e.pageX - e.target.getBoundingClientRect().left;
            props.setVolume(volume);
        }}>
            <div id="volume-background"></div>

            <div id="volume-bar" style={{width: props.volume + 'px'}}>
            </div>

            <div id="volume-bar-handle" style={{left: props.volume - 4 + 'px'}}>
            </div>
        </div>
    );
};

VolumeControl.propTypes = {
    volume: PropTypes.number.isRequired,
    setVolume: PropTypes.func.isRequired
};

export default VolumeControl;
