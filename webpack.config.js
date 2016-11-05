const path = require("path");

const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {};

config.entry = {
  main: path.join(__dirname, "src", "app", "main.ts"),
  asset: path.join(__dirname, "src", "app", "asset.ts"),
}

config.resolve = {
  extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.scss']
}

config.output = {
  path: path.join(__dirname, "dist"),
  filename: "js/[name].js",
  jsonpFunction: "importJSONP",
  publicPath: "/"
}

config.module = {
  loaders: [
    { test: /\.tsx?$/, loader: "babel-loader?presets[]=es2015!ts-loader" },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        "style",
        "css!sass")
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?name=font/[name].[ext]&limit=10000&mimetype=application/octet-stream"
    }
  ],
}

config.plugins = [
  new CommonsChunkPlugin({
    name: 'asset'
  }),
  new CopyWebpackPlugin([
    { from: 'src/resources/' },
  ]),
  new ExtractTextPlugin("css/main.css"),
  new HtmlWebpackPlugin({
    template: 'src/resources/index.html',
    chunksSortMode: 'dependency',
    inject: 'body'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]

config.devServer = {
  hot: true
}

module.exports = config;