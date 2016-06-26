import React from 'react';

import TrackMenu from './trackMenu.jsx';

class ContextMenu extends React.Component {

    constructor(props){
        super(props);

        this.mouseDownOnMenu = false;

        this.state = {
            isHidden: true
        };

        window.messenger.subscribe('context-menu-toggle',
            function(data){
                this.initializeMenu(data.type, data.data, data.coordinates);

            }.bind(this)
        );
    }

    componentDidMount(){
        window.addEventListener('mousedown', this.contextMenuClick.bind(this), false);
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