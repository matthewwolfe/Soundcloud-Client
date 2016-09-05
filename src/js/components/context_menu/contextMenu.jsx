import React from 'react';
import { connect } from 'react-redux';

import { hideMenu } from '../../actions/contextMenu';

import TrackMenu from './trackMenu.jsx';


class ContextMenu extends React.Component {

    constructor(props){
        super(props);

        this.mouseDownOnMenu = false;
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

        // dispatch setting the state to hidden
        this.props.hide();
    }

    onMouseDown(){
        this.mouseDownOnMenu = true;
    }

    onMouseUp(){
        this.mouseDownOnMenu = false;
    }

    getMenuOfType(){
        let menu;

        if(this.props.type === 'track'){
            menu = <TrackMenu track={this.props.data} />;
        }

        return menu;
    }

    render (){
        if(this.props.hidden){
            return null;
        }

        let styles = {};

        if(!this.props.isHidden){
            styles = {top: this.props.coordinates.y, left: this.props.coordinates.x};
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

const mapStateToProps = (state) => {
    return {
        hidden: state.contextMenu.hidden,
        type: state.contextMenu.type,
        data: state.contextMenu.data,
        coordinates: state.contextMenu.coordinates
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hide: () => {
            dispatch(hideMenu());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContextMenu);