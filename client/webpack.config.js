import path, { dirname, resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  devtool: "source-map",
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@calibre": path.resolve(__dirname, "src"),
    },
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
};
