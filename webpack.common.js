const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(?:js|jsx|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }, '@babel/preset-react']
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            // {
            //     test: /\.(ico|svg|gif|png|jpg|jpeg)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[hash].[ext]',
            //             outputPath: 'assets'
            //         }
            //     }
            // },
            // {
            //     test: /\.html$/i,
            //     use: 'html-loader',
            // }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: './public/template.html'
    //     })
    // ],
}