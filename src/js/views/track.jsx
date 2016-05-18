import React from 'react';

class Track extends React.Component {

    constructor(props){
        super(props);

        this.state = {data: {}};
    }

    render () {
        return (
            <div>
                <h4>{this.props.data.title}</h4>
            </div>
        );
    }
}

export default Track;