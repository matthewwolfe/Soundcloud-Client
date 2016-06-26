import React from 'react';

import MenuItem from './menuItem.jsx';

class TrackMenu extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return (
			<ul className="context-menu-list">
				<li className="list-item">Like</li>
				<li className="list-item">Repost</li>
				<li className="list-item">Add to playlist</li>
			</ul>
		);
	}
}

export default TrackMenu;