var webpack = require('webpack');
var path = require('path');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var BUILD_DIR = path.resolve(__dirname, 'dist/js/views');
var APP_DIR = path.resolve(__dirname, 'src/js');

var config = {
    entry: [
        'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
        APP_DIR + '/index.jsx'
    ],
    output: {
        path: BUILD_DIR,
        publicPath: 'http://localhost:9000/dist/',
        filename: 'bundle.js'
    },
    node: {
        fs: 'empty'
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(new RegExp('^(fs|ipc)$')),
        /*
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
        */
    ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
