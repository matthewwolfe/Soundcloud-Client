import React from 'react';

const SplashScreen = (props) => {
    return (
        <div id="splash-screen" className={props.hidden ? 'hide' : ''}>
            <img src="dist/images/soundcloud_logo.png" />
        </div>
    );
};

export default SplashScreen;