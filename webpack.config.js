const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode : 'development',
    //entry : './modules/pratice.js',
    entry : './index.js',
    output: {
        filename : 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        static : './dist',
        compress : true,
        liveReload : false,
        open : true,
        port : 8080,
        hot : true,
        proxy: {
            '/':{
                target: 'http://localhost:5500',
            },
        },
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },
    resolve: {
        extensions: ['','.js','.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    //create `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                        }
                    }
                ]
            },
            {
                test: /\.m?jsx?$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            //template: './index.html',
            template: './test.html',
            inject: 'body',
        }),
    ],
}