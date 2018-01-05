var path = require('path');
const webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, 'client/build');
var APP_DIR = path.resolve(__dirname, 'client/app');

module.exports = {
    context: APP_DIR,
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './main.js'
        // the entry point of our app
    ],
    output: {
        path: BUILD_DIR,
        publicPath: "/",
        filename: "bundle.js"
    },

    devtool: 'source-map',

    devServer: {
        hot: true,
        // enable HMR on the server
        inline: true,

        contentBase: BUILD_DIR,
        // match the output path

        publicPath: '/'
        // match the output `publicPath`
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.jsx?/,
                include: APP_DIR,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif|ttf)$/,
                use: 'url-loader'
            }
        ]
    },

    resolve: {
        alias: {
            client: path.join(__dirname, 'client')
        },
        extensions: ['.js']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ],
};