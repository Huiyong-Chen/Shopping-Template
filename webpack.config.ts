import HtmlWebpackPlugin from "html-webpack-plugin";
    import { resolve } from "path";
    import Webpack from "webpack";
    
    console.log(import.meta);
    
    const config: Webpack.Configuration = {
      mode: "development",
      entry: {
        bundle: "./src/index.mts",
      },
      output: {
        path: resolve(import.meta.dirname, "dist"),
        filename: "js/[name].[hash:6].js",
      },
      module: {
        rules: [
          { test: /.css$/i, use: ["style-loader", "css-loader"] },
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
        }),
new HtmlWebpackPlugin({
          filename: "login.html",
          template: "./src/login.html",
        }),
new HtmlWebpackPlugin({
          filename: "reg.html",
          template: "./src/reg.html",
        }),
new HtmlWebpackPlugin({
          filename: "mygxin.html",
          template: "./src/mygxin.html",
        }),
new HtmlWebpackPlugin({
          filename: "cart.html",
          template: "./src/cart.html",
        }),
new HtmlWebpackPlugin({
          filename: "paint.html",
          template: "./src/paint.html",
        }),
new HtmlWebpackPlugin({
          filename: "flowerDer.html",
          template: "./src/flowerDer.html",
        }),
new HtmlWebpackPlugin({
          filename: "proList.html",
          template: "./src/proList.html",
        }),
new HtmlWebpackPlugin({
          filename: "vase_proList.html",
          template: "./src/vase_proList.html",
        }),
new HtmlWebpackPlugin({
          filename: "decoration.html",
          template: "./src/decoration.html",
        }),
new HtmlWebpackPlugin({
          filename: "zbproList.html",
          template: "./src/zbproList.html",
        }),
new HtmlWebpackPlugin({
          filename: "bzproList.html",
          template: "./src/bzproList.html",
        }),
new HtmlWebpackPlugin({
          filename: "perfume.html",
          template: "./src/perfume.html",
        }),
new HtmlWebpackPlugin({
          filename: "idea.html",
          template: "./src/idea.html",
        }),
new HtmlWebpackPlugin({
          filename: "proDetail.html",
          template: "./src/proDetail.html",
        }),
new HtmlWebpackPlugin({
          filename: "order.html",
          template: "./src/order.html",
        }),
new HtmlWebpackPlugin({
          filename: "ok.html",
          template: "./src/ok.html",
        }),
new HtmlWebpackPlugin({
          filename: "myorderq.html",
          template: "./src/myorderq.html",
        }),
new HtmlWebpackPlugin({
          filename: "myprod.html",
          template: "./src/myprod.html",
        }),
new HtmlWebpackPlugin({
          filename: "address.html",
          template: "./src/address.html",
        }),
new HtmlWebpackPlugin({
          filename: "mygrxx.html",
          template: "./src/mygrxx.html",
        }),
new HtmlWebpackPlugin({
          filename: "remima.html",
          template: "./src/remima.html",
        }),
new HtmlWebpackPlugin({
          filename: "orderxq.html",
          template: "./src/orderxq.html",
        }),
new HtmlWebpackPlugin({
          filename: "wuliu.html",
          template: "./src/wuliu.html",
        }),
        new Webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
        }),
      ],
    };
    
    export default config;
    