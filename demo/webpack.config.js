var webpack = require('webpack');
console.log(__dirname);
module.exports = {
    watch: true,
    devtool: 'source-map',
    entry: {
        ['demo']: [
            `${__dirname}/source/assets/js/example1.js`,
            `${__dirname}/source/assets/js/example2.js`
        ]
    },

    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            'node_modules',
        ]
    },

    output: {
        path: '/assets/js/',
        filename: '[name].js',
        libraryTarget: 'var',
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components|\.tmp|build)/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
    ],

    node: {
        console: false
    }
};
