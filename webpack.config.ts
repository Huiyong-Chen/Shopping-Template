import path, { resolve } from "path";
import webpack from "webpack";

console.log(import.meta);

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.mts",
  output: {
    path: resolve(import.meta.dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [{ test: /\.([cm]?ts)$/, loader: "ts-loader" }],
  },
};

export default config;
