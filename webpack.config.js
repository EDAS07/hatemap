let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let WebpackMd5Hash = require('webpack-md5-hash');
let ManifestPlugin = require('webpack-manifest-plugin');
// let VersionFile = require('webpack-version-file');

let path = require('path');


module.exports = {

    entry: {

        app: './resources/assets/js/app.js',

        vendor: ['vue', 'axios', 'jquery', 'bootstrap']

    },


    output: {

        path: path.resolve(__dirname, 'public'),

        filename: 'js/[name].js',

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

        new ExtractTextPlugin("css/[name].css"),

        new WebpackMd5Hash(),
        
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

    module.exports.plugins.push(

        new ManifestPlugin(
        {
            fileName: 'rev-manifest.json'
        })

    );

    module.exports.plugins.push(

        new ExtractTextPlugin("css/[name].[chunkhash].css")

    );

    module.exports.output.path = path.resolve(__dirname, 'public/build');
    module.exports.output.filename = 'js/[name].[chunkhash].js';

}
