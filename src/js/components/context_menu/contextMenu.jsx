import React from 'react';

import TrackMenu from './trackMenu.jsx';

class ContextMenu extends React.Component {

    constructor(props){
        super(props);

        this.mouseDownOnMenu = false;

        this.state = {
            isHidden: true
        };

        this.handleClick = this.contextMenuClick.bind(this)
    }

    componentDidMount(){
        window.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount(){
        window.removeEventListener('mousedown', this.handleClick);
    }

    contextMenuClick(){
        if (this.mouseDownOnMenu){
            return;
        }

        this.setState({
            isHidden: true
        });
    }

    onMouseDown(){
        this.mouseDownOnMenu = true;
    }

    onMouseUp(){
        this.mouseDownOnMenu = false;
    }

    initializeMenu(type, data, coordinates){
        this.setState({
            isHidden: false,
            type: type,
            data: data,
            coordinates: coordinates
        });
    }

    getMenuOfType(){
        let menu;

        if(this.state.type === 'track'){
            menu = <TrackMenu track={this.state.data} />;
        }

        return menu;
    }

    render (){
        let styles = {};

        if(!this.state.isHidden){
            styles = {top: this.state.coordinates.y, left: this.state.coordinates.x};


        } else {
            styles = {display: 'none'};
        }

        let menu = this.getMenuOfType();

        return (
            <div id="context-menu"
                 style={styles}
                 onMouseDown={this.onMouseDown.bind(this)}
                 onMouseUp={this.onMouseUp.bind(this)}>

                 {menu}
            </div>
        );
    }
}

export default ContextMenu;