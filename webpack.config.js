const path = require('path');
const webpack = require('webpack');
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
        entry: isProduction
            ? './src/index.jsx'
            : [
                  'webpack-dev-server/client?http://localhost:9000/',
                  'webpack/hot/dev-server',
                  './src/index.jsx',
              ],
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
            hotOnly: true,
            injectClient: false,
            port: 9000,
            historyApiFallback: true,
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
                template: 'src/index.html',
            }),
        ],
        optimization: {
            minimize: isProduction,
            minimizer: [new OptimizeCSSAssetsPlugin({})],
        },
    };

    if (!isProduction) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
    } else {
        config.plugins.push(
            new CopyPlugin({
                patterns: [{ from: 'public', to: path.resolve(__dirname, 'dist') }],
            })
        );
    }

    return config;
};
