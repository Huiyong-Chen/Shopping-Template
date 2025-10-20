import HtmlWebpackPlugin from "html-webpack-plugin";
import { join, resolve } from "path";
import { VueLoaderPlugin } from "vue-loader";
import Webpack from "webpack";

const config: Webpack.Configuration | Webpack.WebpackOptionsNormalized = {
  mode: "development",
  devServer: {
    static: {
      directory: join(import.meta.dirname, "../dist/vue"),
    },
    compress: true,
    port: 9000,
  },
  entry: {
    index: resolve(import.meta.dirname, "../src/vue/main.js"),
  },
  output: {
    clean: true,
    path: resolve(import.meta.dirname, "../dist/vue"),
    filename: "js/[name].[hash:6].js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      chunks: ["index"],
    }),
    new VueLoaderPlugin() as any,
  ],
};

export default config;
