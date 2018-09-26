const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');


module.exports = merge(common, {
    module: {
        rules: [
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader?url=false&minimize=1', 'sass-loader'])
            }
        ]
    },
    plugins: [
        // Uncomment to enable auto deploy, make sure you update the destination.
        // new FileManagerPlugin({
        //     onStart: { copy: [{source: 'static', destination: 'dist'}] },
        //     onEnd: { copy: [{source: 'dist', destination: '\\\\uat-ext.kier.group@SSL\\DavWWWRoot\\kiera\\Pages\\Library'}] },
        // }),
        new webpack.DefinePlugin({
            DEVELOPMENT: JSON.stringify(false)
        }),
        new UglifyJSPlugin()
    ]
});