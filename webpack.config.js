const path = require('path');
const webpack = require('webpack');
const {removeEmpty, getIfUtils} = require('webpack-config-utils');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'client/app');
const CLIENT_DIR = path.resolve(__dirname, 'client');

const env = process.env.NODE_ENV || 'local';
const {ifProduction, ifNotProduction} = getIfUtils(env);
console.log(`Webpack bundling in ${env} mode`)

module.exports = removeEmpty({
    context: CLIENT_DIR,
    entry: removeEmpty([
        ifNotProduction('react-hot-loader/patch'),
        // activate HMR for React

        ifNotProduction('webpack-dev-server/client?http://localhost:8080'),
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        ifNotProduction('webpack/hot/only-dev-server'),
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './main.js'
        // the entry point of our app
    ]),
    output: ifProduction(
        {
            path: BUILD_DIR,
            filename: 'bundle.js'
        },
        {
            path: BUILD_DIR,
            publicPath: '/',
            filename: 'bundle.js'
        }
    ),

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
                include: CLIENT_DIR,
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

    plugins: removeEmpty([
        ifNotProduction(new webpack.HotModuleReplacementPlugin()),
        // enable HMR globally

        ifNotProduction(new webpack.NamedModulesPlugin()),
        // prints more readable module names in the browser console on HMR updates
    ]),
});