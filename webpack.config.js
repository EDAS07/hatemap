let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let path = require('path');


module.exports = {

    entry: {

        app: './resources/assets/js/app.js',

        vendor: ['vue', 'axios', 'jquery', 'bootstrap']

    },


    output: {

        path: path.resolve(__dirname, 'public/js'),

        filename: '[name].js',

        publicPath: './public',


    },

    module: {

        rules: [

            {test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader')},
            

            {

                test: /\.js$/,

                exclude: /nude_modules/,

                loader: 'babel-loader'

            },

            {

                test: /\.vue$/,

                exclude: /nude_modules/,

                loader: 'vue-loader'

            },

        ]

    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({

            names: ['vendor']

        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery',
            Vue: 'vue',
            axios: 'axios'
        }),

        new ExtractTextPlugin("../css/[name].css")
    ]


};

if (process.env.NODE_ENV === 'production') {

    module.exports.plugins.push(

            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: {removeAll: true } },
                canPrint: true
            })

    );

    module.exports.plugins.push(

        new webpack.optimize.UglifyJsPlugin({

            sourcemap: true,

            compress: {

                warnings: false

            }

        })

    );

    module.exports.plugins.push(

        new webpack.DefinePlugin({

            'process.env': {

                NODE_ENV: JSON.stringify('production')

            }

        })

    );

}
