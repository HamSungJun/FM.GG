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
                test: /\.(png|svg|jpg|jpeg|woff)$/,
                exclude: /node_modules/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "build/"
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