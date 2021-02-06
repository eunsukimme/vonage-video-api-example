// webpack.config.js
// `webpack` command will pick up this config setup by default
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  console.log(env.NODE_ENV);

  return {
    devtool: env.NODE_ENV === "production" ? undefined : "eval",
    entry: "./src/index.ts",
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
        },
        {
          test: /\.ts$/,
          use: "ts-loader",
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
      new MiniCssExtractPlugin(),
    ],
    output: {
      filename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 3000,
      hot: true,
    },
    optimization: {
      usedExports: true,
      minimize: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "initial",
          },
        },
      },
    },
  };
};
