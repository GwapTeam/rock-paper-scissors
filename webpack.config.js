let path           = require("path")

module.exports = {
  entry: {
    "main.js": [
      "babel-polyfill",
      "main",
    ]
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: [
                "transform-object-rest-spread"
              ],
              presets: [
                "env",
              ]
            }
          }
        ]
      }
    ]
  },
  node: {
    net: 'empty',
  },
  output: {
    filename  : "[name]",
    path      : path.resolve(__dirname, "build"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".js"],
    modules: ["src", "node_modules"]
  }
}
