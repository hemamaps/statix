'use strict';

var statixPlugins = require('./statix').plugins;
var iconOptions = require('../demo/lib/icons');
var webpackConfig = require('../demo/webpack.config');

module.exports = {
    useFileWatch: true,
    port: 8000,
    sourceFolder: process.cwd() + '/demo/source',
    outputFolder: process.cwd() + '/demo/build',
    watchFolders: [process.cwd() + '/demo/source', process.cwd() + '/hema_modules'],
    plugins: [[new statixPlugins.SassPlugin({
        directories: ['/assets/**/*.scss']
    }, {
        pattern: ['/**/*.scss']
    }), new statixPlugins.HandlebarsPlugin({
        directories: ['/**/*.html.hbs'],
        templateData: { test: 'test example' },
        batch: ['/layouts', '/partials']
    }, {
        pattern: ['/**/*.html.hbs']
    }), new statixPlugins.CopyPlugin({
        directories: ['/**/*.png']
    }, {
        pattern: ['/assets/img/**/*.png', '/assets/img/**/*.jpg']
    })], new statixPlugins.GroupPlugin({
        plugins: [new statixPlugins.DirectoryColorfyPlugin({
            colors: iconOptions.test.colors,
            targetFolder: '/assets/img/svgs/support-src'
        }), [new statixPlugins.DirectoryEncoderPlugin({
            targetFolder: '/assets/img/svgs/support-src-colorfy',
            cssFileName: '/assets/img/svgs/support.css',
            template: '/assets/img/svgs/support.css.hbs',
            selectors: iconOptions.test.selectors,
            prefix: 'support-'
        }), new statixPlugins.DirectoryEncoderPlugin({
            targetFolder: '/assets/img/svgs/icon-src',
            cssFileName: '/assets/img/svgs/icon.css',
            template: '/assets/img/svgs/icon.css.hbs',
            prefix: 'icon-'
        })], new statixPlugins.ConcatFilesPlugin({
            files: ['/assets/img/svgs/support.css', '/assets/img/svgs/icon.css'],
            outputFolder: '/assets/css',
            fileName: 'svg.css'
        }), new statixPlugins.CleanPlugin({
            directories: ['/assets/img/svgs/support-src-colorfy', '/assets/img/svgs/support.css', '/assets/img/svgs/icon.css']
        })]
    }, {
        pattern: ['/assets/img/svgs/**/*.svg']
    }), new statixPlugins.WebpackPlugin({
        configuration: webpackConfig
    })]
};
//# sourceMappingURL=config.js.map