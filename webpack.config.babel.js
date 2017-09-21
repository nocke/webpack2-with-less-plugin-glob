import webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';


const entryPath = path.join(__dirname, 'app'); //path to input dir
const assetsPath = path.join(__dirname, 'assets'); //path to output dir

const config = {
    context: entryPath,
    entry: {
        styles: './styles.js'
    },
    output: {
        path: assetsPath,
        filename: "[name].js",
        sourceMapFilename: "[file].map",
        chunkFilename: "[name].[id].js",
        publicPath: './'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                minimize: {
                                    normalizeWhitespace: true,
                                    discardComments: true,
                                    orderedValues: false
                                }
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        autoprefixer({
                                            browsers: ['iOS >= 5', 'ie 7', 'safari 7', 'Firefox >= 46']
                                        }),
                                        cssnano({
                                            discardComments: {
                                                removeAll: true
                                            }
                                        })
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                paths: [
                                    path.resolve(entryPath)
                                ],
                                plugins: [
                                    require('less-plugin-glob')
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ],
    watch: false
};

module.exports = config;