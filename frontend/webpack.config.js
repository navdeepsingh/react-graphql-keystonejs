const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3000;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: "development",
  // Webpack configuration goes here
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: ''
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};