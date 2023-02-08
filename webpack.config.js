const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.jsx"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
