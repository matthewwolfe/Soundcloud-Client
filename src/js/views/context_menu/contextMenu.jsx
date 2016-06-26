import React from 'react';

import MenuItem from './menuItem.jsx';

class ContextMenu extends React.Component {

    constructor(props){
        super(props);

        this.mouseDownOnMenu = false;

        this.state = {
            isHidden: true
        };

        window.messenger.subscribe('context-menu-toggle', function(data){
            this.toggleContextMenu(data.type, data.data, data.coordinates);
        }.bind(this));
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

    toggleContextMenu(type, data, coordinates){
        this.setState({
            isHidden: !this.state.isHidden,
            type: type,
            data: data,
            coordinates: coordinates
        });
    }

    render (){
        let styles = {};
        let menuItems = [];

        if(!this.state.isHidden){
            styles = {top: this.state.coordinates.y, left: this.state.coordinates.x};
        } else {
            styles = {display: 'none'};
        }

        return (
            <div id="context-menu"
                 style={styles}
                 onMouseDown={this.onMouseDown.bind(this)}
                 onMouseUp={this.onMouseUp.bind(this)}>

                <ul>
                    {menuItems}
                </ul>
            </div>
        );
    }
}

export default ContextMenu;