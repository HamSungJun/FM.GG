const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/components/Root.jsx",
    output: {
        filename: "bundle.[hash].js",
        path: path.resolve(__dirname + "/build")
    },
    mode: "development",
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
                test: /\.(jpg|jpeg|gif|png|svg|ico|woff|woff2|eot|ttf|otf)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: './Assets/[name].[ext]'
                    }
                }
            },

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
        // new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: path.resolve("./build"),
        historyApiFallback : true,
        index: "index.html",
        port: 8000
    }
};