const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        entry: ['./src/index.jsx'],
        output: {
            filename: 'script.js',
            path: path.join(__dirname, '/dist'),
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.jsx'],
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            watchContentBase: true,
            hot: true,
            compress: true,
            port: 9000,
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    enforce: 'pre',
                    use: ['eslint-loader'],
                    exclude: /(node_modules)/,
                },
                {
                    oneOf: [
                        {
                            test: /\.(js|jsx)$/,
                            exclude: /(node_modules)/,
                            use: {
                                loader: 'babel-loader',
                            },
                        },
                        {
                            test: /\.s[ac]ss$/i,
                            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                        },
                        {
                            test: /\.(png|jpg|gif)$/i,
                            use: [
                                {
                                    loader: 'url-loader',
                                    options: { limit: 8192 },
                                },
                            ],
                        },
                        {
                            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
                            use: {
                                loader: 'file-loader',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
            new HtmlWebpackPlugin({
                template: 'public/index.html',
            }),
            new CopyPlugin({ patterns: [{ from: 'public' }] }),
        ],
        optimization: {
            minimize: isProduction,
            minimizer: [new OptimizeCSSAssetsPlugin({})],
        },
    };

    return config;
};
