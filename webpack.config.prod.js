const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/components/Root.jsx",
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname + "/build")
    },
    mode: "production",
    module: {
        rules:[
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {minimize: true}
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: "images/[name].[ext]",
                        fallback: "file-loader",
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                        limit: 10000,
                        fallback: "file-loader"
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './style/style.css'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: path.resolve("./build"),
        index: "index.html",
        port: 9000
    }
};