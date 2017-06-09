let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let WebpackMd5Hash = require('webpack-md5-hash');
let ManifestPlugin = require('webpack-manifest-plugin');

let path = require('path');

module.exports = {

    entry: {

        app: './resources/assets/js/app.js',

        vendor: ['vue', 'vue-router', 'axios', 'jquery', 'bootstrap-sass']

    },

    output: {
        /*
            > path.normalize('../../src/../src/node')  -> show shortest path for the same place
            '../../src/node'
            > path.resolve('../../src/../src/node')  -> show destination of input path
            '/Users/mtilley/src/node'

        */
        path: path.resolve(__dirname, 'public'),    //__dirname = where is webpack.config.js

        filename: 'js/[name].js',   // name = entry point's key

        publicPath: './public',  //where the server serve file from

    },

    module: {

        rules: [

            {test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader')},

            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },

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
            'vue$': 'vue/dist/vue.common.js',
            'vue-router$': 'vue-router/dist/vue-router.min.js',
            '@sass': path.resolve(__dirname, 'resources/assets/sass'),
            '@components': path.resolve(__dirname, 'resources/assets/js/components')
        }
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({

            names: ['vendor']

        }),

        /*
            use ProvidePlugin
            Do not need to import file in the file
            ex: import Vue from 'vue';  -> this 'vue' is mean resolve alias key 'vue$'
        */
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery',
            Vue: 'vue',     // -> this 'vue' is mean resolve alias key 'vue$'
                            // -> so use 'vue/dist/vue.common.js' is work
            VueRouter: 'vue-router',
            axios: 'axios'
        }),

        /*
            use ExtractTextPlugin
            which would compile all scss file which import from entry key's file and
            export to relative path(css/[entroy keys name].css)

            so if i import scss at entry key: homeapp
            ex. import style from '../sass/BBB.scss';
            BBB.scss will be compiled to file 'css/homeapp.css'

            if i import multifiles scss at same entry key: homeapp
            ex.
            import style from '../sass/BBB.scss';
            import style2 from '../sass/test.scss';

            these file will be compiled in same file 'css/homeapp.css'

        */
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
