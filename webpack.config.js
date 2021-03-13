const path = require("path");
const webpack = require("webpack");

module.exports = {
  watch: true,

  watchOptions: {
    ignored: "node_modules/**",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        test: /\.(css)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  mode: "development",
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, "frontend/static/frontend/js/"),
    filename: "main.js",
  },
};
