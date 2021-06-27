const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
module.exports = {
  mode: "development",
 devServer: {
    https: true,
    port: 3020
  },
  devtool: 'inline-source-map',
  
  devtool: 'inline-source-map',
  entry: './src/index.mjs',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '/home/kafka/www/public'),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/data', to: './data' },
        { from: './src/videos', to: './videos' }
      ],
    }),
    new FaviconsWebpackPlugin('./favicon.ico') 
  ], 
  
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
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }

    ],
  },
};