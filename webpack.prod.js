const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const CleanWebPackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, '../server/build'),
    },
    plugins: [
        new CleanWebPackPlugin.CleanWebpackPlugin(),
    ],
});