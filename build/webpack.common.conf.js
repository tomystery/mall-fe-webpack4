const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const generateConfig = env =>{

} 

module.exports = env => {
    let config = env === 'production'
        ? productionConfig
        : developmentConfig

    return merge(generateConfig(env), config)
}