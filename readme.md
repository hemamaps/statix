# Statix
A configurable static site generator used for our front end projects. It uses
a file in the root of your project called statix.config.js that the [CLI](https://github.com/hemamaps/statix-cli) will consume
to build and create a development server for you.



## Demo Project
1. Run `npm run demo`

## Use in project
1. `npm install hemamaps/statix`
2. Create `path-to-project/statix.config.js`

```
// This example uses the configuration from hemamaps/statix-demo

var statixPlugins = require('statix').plugins;
var iconOptions = require('./lib/icons');
var webpackConfig = require('./webpack.config');

module.exports = {
    useFileWatch: true,
    port: 8000,
    sourceFolder: process.cwd() + '/source', // Expects absolute URL to the source
    outputFolder: process.cwd() + '/build', // Expects absolute URL to the output folder
    watchFolders: [process.cwd() + '/source'], // Expects absolute URL to the folders you want the file watcher to be applied to
    plugins: [
        [
            new statixPlugins.SassPlugin({
                directories: ['/assets/**/*.scss']
            }, {
                pattern: ['/**/*.scss']
            }),
            new statixPlugins.HandlebarsPlugin({
                directories: ['/**/*.html.hbs'],
                templateData: { test: 'test example'},
                batch: ['/layouts', '/partials']
            }, {
                pattern: ['/**/*.html.hbs']
            }),
            new statixPlugins.CopyPlugin({
                directories: ['/**/*.png']
            }, {
                pattern: ['/assets/img/**/*.png', '/assets/img/**/*.jpg']
            })
        ],
        new statixPlugins.GroupPlugin({
            plugins: [
                new statixPlugins.DirectoryColorfyPlugin({
                    colors: iconOptions.test.colors,
                    targetFolder: '/assets/img/svgs/support-src'
                }),
                [
                    new statixPlugins.DirectoryEncoderPlugin({
                        targetFolder: '/assets/img/svgs/support-src-colorfy',
                        cssFileName: '/assets/img/svgs/support.css',
                        template: '/assets/img/svgs/support.css.hbs',
                        selectors: iconOptions.test.selectors,
                        prefix: 'support-'
                    }),
                    new statixPlugins.DirectoryEncoderPlugin({
                        targetFolder: '/assets/img/svgs/icon-src',
                        cssFileName: '/assets/img/svgs/icon.css',
                        template: '/assets/img/svgs/icon.css.hbs',
                        prefix: 'icon-'
                    }),
                ],
                new statixPlugins.ConcatFilesPlugin({
                    files: ['/assets/img/svgs/support.css', '/assets/img/svgs/icon.css'],
                    outputFolder: '/assets/css',
                    fileName: 'svg.css'
                }),
                new statixPlugins.CleanPlugin({
                    directories: ['/assets/img/svgs/support-src-colorfy', '/assets/img/svgs/support.css', '/assets/img/svgs/icon.css']
                })
            ]
        }, {
            pattern: ['/assets/img/svgs/**/*.svg']
        }),
        new statixPlugins.WebpackPlugin({
            configuration: webpackConfig
        })
    ]
};
```

3. Install [statix CLI](https://github.com/hemamaps/statix-cli)
4. run `statix serve`

## Plugins

### Clean Plugin
This plugin will remove files that have been generated in your source folder as part of another task

### Concat files plugin
This plugin concatinates multiple files into a single file and outputs into the statix .tmp directory

### Copy Plugin
This plugin copies files from source to the statix .tmp directory

### Directory Colorfy Plugin
This plugin runs [directory colorfy](https://github.com/filamentgroup/directory-colorfy)

### Directory Encoder Plugin
This plugin runs [directory encoder](https://github.com/filamentgroup/directory-encoder)

### Group Plugin
This plugin takes an array of other plugins that will be run synchronous. Useful for if you have multiple tasks that are all related to the outcome.

### Handlebars Plugin
This plugin takes handlebars templates and builds them

### Sass Plugin
This plugin builds your sass files

### Webpack Plugin
This plugin runs a [webpack](https://github.com/webpack/webpack) server




## Contributing

## Build Project
Built on ES6 and uses babel
to compile down to ES5
1. Run `npm run build`