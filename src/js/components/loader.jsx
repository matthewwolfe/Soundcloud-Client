import React from 'react';

class Loader extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="loader-container">
                <div className="loader">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Loader;