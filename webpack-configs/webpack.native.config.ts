import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { join, resolve } from "path";
import TerserPlugin from "terser-webpack-plugin";
import Webpack from "webpack";

const config: Webpack.Configuration | Webpack.WebpackOptionsNormalized = {
  mode: "development",
  devServer: {
    static: {
      directory: join(import.meta.dirname, "../dist/native"),
    },
    compress: true,
    port: 9000,
  },
  devtool: "source-map",
  entry: {
    index: "./src/native/index.mts",
    login: "./src/native/login.mts",
    reg: "./src/native/reg.mts",
    forget: "./src/native/forget.mts",
    mygxin: "./src/native/mygxin.mts",
    cart: "./src/native/cart.mts",
    paint: "./src/native/paint.mts",
    flowerDer: "./src/native/flowerDer.mts",
    proList: "./src/native/proList.mts",
    vase_proList: "./src/native/vase_proList.mts",
    decoration: "./src/native/decoration.mts",
    zbproList: "./src/native/zbproList.mts",
    bzproList: "./src/native/bzproList.mts",
    perfume: "./src/native/perfume.mts",
    idea: "./src/native/idea.mts",
    proDetail: "./src/native/proDetail.mts",
    order: "./src/native/order.mts",
    ok: "./src/native/ok.mts",
    myorderq: "./src/native/myorderq.mts",
    myprod: "./src/native/myprod.mts",
    address: "./src/native/address.mts",
    mygrxx: "./src/native/mygrxx.mts",
    remima: "./src/native/remima.mts",
    orderxq: "./src/native/orderxq.mts",
    wuliu: "./src/native/wuliu.mts",
  },
  output: {
    clean: true,
    path: resolve(import.meta.dirname, "../dist/native"),
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
      { test: /.([cm]?ts)$/i, loader: "ts-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/native/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/native/login.html",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      filename: "reg.html",
      template: "./src/native/reg.html",
      chunks: ["reg"],
    }),
    new HtmlWebpackPlugin({
      filename: "forget.html",
      template: "./src/native/forget.html",
      chunks: ["forget"],
    }),
    new HtmlWebpackPlugin({
      filename: "mygxin.html",
      template: "./src/native/mygxin.html",
      chunks: ["mygxin"],
    }),
    new HtmlWebpackPlugin({
      filename: "cart.html",
      template: "./src/native/cart.html",
      chunks: ["cart"],
    }),
    new HtmlWebpackPlugin({
      filename: "paint.html",
      template: "./src/native/paint.html",
      chunks: ["paint"],
    }),
    new HtmlWebpackPlugin({
      filename: "flowerDer.html",
      template: "./src/native/flowerDer.html",
      chunks: ["flowerDer"],
    }),
    new HtmlWebpackPlugin({
      filename: "proList.html",
      template: "./src/native/proList.html",
      chunks: ["proList"],
    }),
    new HtmlWebpackPlugin({
      filename: "vase_proList.html",
      template: "./src/native/vase_proList.html",
      chunks: ["vase_proList"],
    }),
    new HtmlWebpackPlugin({
      filename: "decoration.html",
      template: "./src/native/decoration.html",
      chunks: ["decoration"],
    }),
    new HtmlWebpackPlugin({
      filename: "zbproList.html",
      template: "./src/native/zbproList.html",
      chunks: ["zbproList"],
    }),
    new HtmlWebpackPlugin({
      filename: "bzproList.html",
      template: "./src/native/bzproList.html",
      chunks: ["bzproList"],
    }),
    new HtmlWebpackPlugin({
      filename: "perfume.html",
      template: "./src/native/perfume.html",
      chunks: ["perfume"],
    }),
    new HtmlWebpackPlugin({
      filename: "idea.html",
      template: "./src/native/idea.html",
      chunks: ["idea"],
    }),
    new HtmlWebpackPlugin({
      filename: "proDetail.html",
      template: "./src/native/proDetail.html",
      chunks: ["proDetail"],
    }),
    new HtmlWebpackPlugin({
      filename: "order.html",
      template: "./src/native/order.html",
      chunks: ["order"],
    }),
    new HtmlWebpackPlugin({
      filename: "ok.html",
      template: "./src/native/ok.html",
      chunks: ["ok"],
    }),
    new HtmlWebpackPlugin({
      filename: "myorderq.html",
      template: "./src/native/myorderq.html",
      chunks: ["myorderq"],
    }),
    new HtmlWebpackPlugin({
      filename: "myprod.html",
      template: "./src/native/myprod.html",
      chunks: ["myprod"],
    }),
    new HtmlWebpackPlugin({
      filename: "address.html",
      template: "./src/native/address.html",
      chunks: ["address"],
    }),
    new HtmlWebpackPlugin({
      filename: "mygrxx.html",
      template: "./src/native/mygrxx.html",
      chunks: ["mygrxx"],
    }),
    new HtmlWebpackPlugin({
      filename: "remima.html",
      template: "./src/native/remima.html",
      chunks: ["remima"],
    }),
    new HtmlWebpackPlugin({
      filename: "orderxq.html",
      template: "./src/native/orderxq.html",
      chunks: ["orderxq"],
    }),
    new HtmlWebpackPlugin({
      filename: "wuliu.html",
      template: "./src/native/wuliu.html",
      chunks: ["wuliu"],
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
