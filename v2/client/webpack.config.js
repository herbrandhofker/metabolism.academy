const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
module.exports = {
  mode: "development",

devtool: 'inline-source-map',

  devtool: 'inline-source-map',
  entry: './src/index.mjs',
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
      new FaviconsWebpackPlugin('./favicon.ico') 
  ], output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

    ],
  },
};