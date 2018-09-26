const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = merge(common, {
    module: {
        rules: [
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader?url=false', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new FileManagerPlugin({
            onStart: { copy: [{source: 'static', destination: 'dist'}] },
            // Remember to update the destination to your own folder
            onEnd: { copy: [{source: 'dist\\pages', destination: '\\\\uat-ext.kier.group@SSL\\DavWWWRoot\\sites\\hrcareerpathways\\_catalogs\\masterpage\\Html'},
                            {source: 'dist\\js', destination: '\\\\uat-ext.kier.group@SSL\\DavWWWRoot\\sites\\hrcareerpathways\\_catalogs\\masterpage\\Res\\js'},
                            {source: 'dist\\css', destination: '\\\\uat-ext.kier.group@SSL\\DavWWWRoot\\sites\\hrcareerpathways\\_catalogs\\masterpage\\Res\\css'},
                            // {source: 'dist\\images', destination: '\\\\uat-ext.kier.group@SSL\\DavWWWRoot\\sites\\hrcareerpathways\\_catalogs\\masterpage\\images'},
                            {source: 'dist\\masterpage', destination: '\\\\uat-ext.kier.group@SSL\\DavWWWRoot\\sites\\hrcareerpathways\\_catalogs\\masterpage'}] }
        }),
        new webpack.DefinePlugin({
            DEVELOPMENT: JSON.stringify(true)            
        })
    ]
});