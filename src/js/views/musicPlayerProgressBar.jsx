import React from 'react';

class MusicPlayerProgressBar extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div id="progress-bar">
                <div id="current-time">0:00</div>

                <div id="track-timeline">
                    <div id="progress-background"></div>
                    <div id="progress-bar"></div>
                    <div id="progress-bar-handle"></div>
                </div>

                <div id="duration-time">3:15</div>
            </div>
		);
	}
}

export default MusicPlayerProgressBar;