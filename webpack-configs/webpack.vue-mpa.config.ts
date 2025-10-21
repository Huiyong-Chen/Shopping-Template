import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { join, resolve } from "path";
import TerserPlugin from "terser-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import Webpack from "webpack";

const config: Webpack.Configuration | Webpack.WebpackOptionsNormalized = {
  mode: "development",
  devServer: {
    static: {
      directory: join(import.meta.dirname, "../dist/vue-mpa"),
    },
    compress: true,
    port: 9000,
  },
  devtool: "source-map",
  entry: {
    home: resolve(import.meta.dirname, "../src/vue-mpa/mpa/home.js"),
    login: resolve(import.meta.dirname, "../src/vue-mpa/mpa/login.js"),
  },
  output: {
    clean: true,
    path: resolve(import.meta.dirname, "../dist/vue-mpa"),
    filename: "js/[name].[hash:6].js",
  },
  module: {
    rules: [
      { test: /.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /.(jpg|png|jpeg|gif|svg)$/i,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
        generator: {
          filename: "assets/images/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.([cm])?ts$/i,
        loader: "ts-loader",
        options: {
          transpileOnly: true, // ✅ 不执行类型检查，只编译 JS
          appendTsSuffixTo: [/\.vue$/], // ✅ 让 .vue 文件的 <script lang="ts"> 能被识别
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/i,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "home.html",
      template: "./public/index.html",
      chunks: ["home"],
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./public/index.html",
      chunks: ["login"],
    }),
    new Webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(import.meta.dirname, "../src/native/img"),
          to: resolve(import.meta.dirname, "../dist/native/assets/images"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[hash:6].css",
      chunkFilename: "styles/[name].[hash:6].chunk.css",
    }),
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
  },
};

export default config;
