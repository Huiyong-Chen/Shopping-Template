import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { join, resolve } from "path";
import Webpack from "webpack";

const config: Webpack.Configuration | Webpack.WebpackOptionsNormalized = {
  mode: "development",
  devServer: {
    static: {
      directory: join(import.meta.dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  entry: {
    index: "./src/index.mts",
    login: "./src/login.mts",
    reg: "./src/reg.mts",
    forget: "./src/forget.mts",
    mygxin: "./src/mygxin.mts",
    cart: "./src/cart.mts",
    paint: "./src/paint.mts",
    flowerDer: "./src/flowerDer.mts",
    proList: "./src/proList.mts",
    vase_proList: "./src/vase_proList.mts",
    decoration: "./src/decoration.mts",
    zbproList: "./src/zbproList.mts",
    bzproList: "./src/bzproList.mts",
    perfume: "./src/perfume.mts",
    idea: "./src/idea.mts",
    proDetail: "./src/proDetail.mts",
    order: "./src/order.mts",
    ok: "./src/ok.mts",
    myorderq: "./src/myorderq.mts",
    myprod: "./src/myprod.mts",
    address: "./src/address.mts",
    mygrxx: "./src/mygrxx.mts",
    remima: "./src/remima.mts",
    orderxq: "./src/orderxq.mts",
    wuliu: "./src/wuliu.mts",
  },
  output: {
    path: resolve(import.meta.dirname, "dist"),
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
      template: "./src/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/login.html",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      filename: "reg.html",
      template: "./src/reg.html",
      chunks: ["reg"],
    }),
    new HtmlWebpackPlugin({
      filename: "forget.html",
      template: "./src/forget.html",
      chunks: ["forget"],
    }),
    new HtmlWebpackPlugin({
      filename: "mygxin.html",
      template: "./src/mygxin.html",
      chunks: ["mygxin"],
    }),
    new HtmlWebpackPlugin({
      filename: "cart.html",
      template: "./src/cart.html",
      chunks: ["cart"],
    }),
    new HtmlWebpackPlugin({
      filename: "paint.html",
      template: "./src/paint.html",
      chunks: ["paint"],
    }),
    new HtmlWebpackPlugin({
      filename: "flowerDer.html",
      template: "./src/flowerDer.html",
      chunks: ["flowerDer"],
    }),
    new HtmlWebpackPlugin({
      filename: "proList.html",
      template: "./src/proList.html",
      chunks: ["proList"],
    }),
    new HtmlWebpackPlugin({
      filename: "vase_proList.html",
      template: "./src/vase_proList.html",
      chunks: ["vase_proList"],
    }),
    new HtmlWebpackPlugin({
      filename: "decoration.html",
      template: "./src/decoration.html",
      chunks: ["decoration"],
    }),
    new HtmlWebpackPlugin({
      filename: "zbproList.html",
      template: "./src/zbproList.html",
      chunks: ["zbproList"],
    }),
    new HtmlWebpackPlugin({
      filename: "bzproList.html",
      template: "./src/bzproList.html",
      chunks: ["bzproList"],
    }),
    new HtmlWebpackPlugin({
      filename: "perfume.html",
      template: "./src/perfume.html",
      chunks: ["perfume"],
    }),
    new HtmlWebpackPlugin({
      filename: "idea.html",
      template: "./src/idea.html",
      chunks: ["idea"],
    }),
    new HtmlWebpackPlugin({
      filename: "proDetail.html",
      template: "./src/proDetail.html",
      chunks: ["proDetail"],
    }),
    new HtmlWebpackPlugin({
      filename: "order.html",
      template: "./src/order.html",
      chunks: ["order"],
    }),
    new HtmlWebpackPlugin({
      filename: "ok.html",
      template: "./src/ok.html",
      chunks: ["ok"],
    }),
    new HtmlWebpackPlugin({
      filename: "myorderq.html",
      template: "./src/myorderq.html",
      chunks: ["myorderq"],
    }),
    new HtmlWebpackPlugin({
      filename: "myprod.html",
      template: "./src/myprod.html",
      chunks: ["myprod"],
    }),
    new HtmlWebpackPlugin({
      filename: "address.html",
      template: "./src/address.html",
      chunks: ["address"],
    }),
    new HtmlWebpackPlugin({
      filename: "mygrxx.html",
      template: "./src/mygrxx.html",
      chunks: ["mygrxx"],
    }),
    new HtmlWebpackPlugin({
      filename: "remima.html",
      template: "./src/remima.html",
      chunks: ["remima"],
    }),
    new HtmlWebpackPlugin({
      filename: "orderxq.html",
      template: "./src/orderxq.html",
      chunks: ["orderxq"],
    }),
    new HtmlWebpackPlugin({
      filename: "wuliu.html",
      template: "./src/wuliu.html",
      chunks: ["wuliu"],
    }),
    new Webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(import.meta.dirname, "./src/img"),
          to: resolve(import.meta.dirname, "./dist/assets/images"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[hash:6].css",
      chunkFilename: "styles/[name].[hash:6].chunk.css",
    }),
  ],
};

export default config;
