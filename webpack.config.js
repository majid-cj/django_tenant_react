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
    ],
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  mode: "development",
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, "frontend/static/frontend"),
    filename: "main.js",
  },

  mode: "production",
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, "frontend/static/frontend"),
    filename: "main.js",
  },
};
