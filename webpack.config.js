const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
var ProgressPlugin = require('progress-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[contenthash][ext][query]',
        clean: true,
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/images/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
        },
    },
    module: {
        rules: [{
                // Test declara que extensión de archivos aplicara el loader
                test: /\.js$/,
                // Use es un arreglo u objeto donde dices que loader aplicaras
                use: {
                    loader: 'babel-loader',
                },
                // Exclude permite omitir archivos o carpetas especificas
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // CONFIGURACIÓN DEL PLUGIN

            inject: 'body', // INYECTA EL BUNDLE AL FINAL DEL BODY
            template: './public/index.html', // LA RUTA AL TEMPLATE HTML
            filename: './index.html', // NOMBRE FINAL DEL ARCHIVO
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/styles/[name].[contenthash].css',
        }),
        new CopyPlugin({
            patterns: [{
                // Que recurso (archivo o directorio) deseamos copiar al directorio final
                from: path.resolve(__dirname, 'src', 'images'),
                // Ruta dentro de la carpeta final terminara los recursos
                to: 'assets/images',
            }, ],
        }),
        new Dotenv(),
        new ProgressPlugin(true),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
    },
};