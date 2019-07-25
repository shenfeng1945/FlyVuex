const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const url = 'http://localhost:8000';

const devServer = {
    hot: true,
    noInfo: false,
    quiet: false,
    port: 8000,
    disableHostCheck: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    inline: true,
    historyApiFallback: {
        index: '/'
    },
    stats: {
        colors: true,
        modules: false
    },
    contentBase: path.resolve(__dirname, './dist'),
    publicPath: '/'
}

module.exports = {
    context: path.resolve(__dirname, '.'),
    entry: {
        app: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8000/',
            path.resolve(__dirname, './main.js')
        ]
    },
    output: {
        filename: '[name].js',
        path: devServer.contentBase,
        publicPath: devServer.publicPath,
        sourceMapFilename: '[file].map',
        chunkFilename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.vue', '.js'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.js',
            FlyVuex: path.resolve(__dirname, '../src/index.js')
        }
    },
    devServer,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
            }
        })
    ]
}