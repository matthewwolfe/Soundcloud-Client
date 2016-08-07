var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/js/views');
var APP_DIR = path.resolve(__dirname, 'src/js');

var config = {
    entry: APP_DIR + '/components/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
    	loaders: [
    		{
    			test: /\.js?/,
    			include: APP_DIR,
    			loader: 'babel'
    		}
    	]
    },
    plugins: [
        new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("production") 
           }
        })
    ]
};

module.exports = config;
