# Soundcloud Client
An open source soundcloud desktop app built using React, Redux, React-Router, and Electron

[Website](http://matthewwolfe.github.io/Soundcloud-Client/)


##To Build
```
// clone
git clone https://github.com/matthewwolfe/Soundcloud-Client.git

// set up the build tools
npm install

// start the hot reload server
npm run server

// start the application
npm run start

// package the application
npm run package
```

##local.js
This file goes in the root directory of the project, and provides a link to the react dev tools.
```javascript
const config = {
    // replace with your actual react dev tools path
    REACT_DEV_TOOLS_PATH: '/PATH/TO/REACT/DEV/TOOLS/0.15.4_0'
};

module.exports = config;
```
