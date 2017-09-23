const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HotModuleReplacementPlugin = require("webpack").HotModuleReplacementPlugin
const PORT = 8000

module.exports = {
  entry:{
    index: [
      "react-hot-loader/patch",
      `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
      path.resolve("src/index.js"),
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, "src"),
        "node_modules"
      ],
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.less$/,
      use:[
        { loader: "style-loader", options: {sourceMap: true} },
        { 
          loader: "postcss-loader", 
          options: {
            sourceMap: true,
            plugins: [
              require("autoprefixer")({
                browsers: [ "last 2 versions", "android >= 4.4" ],
              }),
            ]
          }
        },
        { loader: "less-loader", options: {sourceMap: true} }, 
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new HotModuleReplacementPlugin({}),
  ],
  resolve: {
    modules: [
      path.resolve("src"),
      "node_modules"
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/',
    disableHostCheck: true,
    hot: true,
    compress: true,
    host: "0.0.0.0",
    port: PORT
  }

}
