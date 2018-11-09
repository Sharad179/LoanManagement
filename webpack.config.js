var path  = require('path');

const webpack = require('webpack');


module.exports = {
    entry: './src/app.js',
    output:{
       filename: 'bundle.js',
       path: path.resolve(__dirname,'public')
    },
    watch: true,
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader',
                query: {
                    presets:['react', 'es2015','stage-1']
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                loader: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000'
            },
            { test: /.(png|jpg)$/, loader: 'file-loader?limit=1024000' }
            
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
}