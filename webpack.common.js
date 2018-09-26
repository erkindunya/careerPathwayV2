const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');
const babelOptions = {
    "presets": [
        "env"
    ]
};


module.exports = {
    devtool: 'source-map',
    entry: {
        main: [
            'babel-polyfill',
            "./scripts/main.ts",
            "./styles/main.scss"
        ]
    },
    output: {
        filename: "[name].js",
        path: __dirname + '/dist/js'
    },
    resolve: {
        modules: ['.', './node_modules'],
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader',
                        options: { configFile: './tslint.json' },
                    }
                ]
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '../css/[name].css',
            allChunks: true
        }),
        new StyleLintPlugin({
            context: 'styles'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "libs",
            filename: "libs.js",
            minChunks: 2
        })
    ]
};