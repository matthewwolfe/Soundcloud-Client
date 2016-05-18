import React from 'react';

class Track extends React.Component {

    constructor(props){
        super(props);

        this.state = {data: {}};
    }

    convertDuration(millis){
        var hours = Math.floor(millis / 36e5),
            mins = Math.floor((millis % 36e5) / 6e4),
            secs = Math.floor((millis % 6e4) / 1000); 
        return (hours > 0 ? hours + ":" : '') + (mins < 10 && hours > 0 ? '0' : '') + mins + ":" + (secs < 10 ? '0' : '') + secs;
    }

    render () {
        return (
            <tr className="track" id={this.props.data.id} stream_url={this.props.data.stream_url}>
                <td className="track-title"><p>{this.props.data.title}</p></td>
                <td className="track-user-username"><p>{this.props.data.user.username}</p></td>
                <td className="track-duration"><p>{this.convertDuration(this.props.data.duration)}</p></td>
            </tr>
        );
    }
}

export default Track;