var iconOptions = require('../demo/lib/icons');
var webpackConfig = require('../demo/webpack.config');

var configuration = {
    useFileWatch: true,
    port: 8000,
    sourceFolder: `${process.cwd()}/demo/source`,
    outputFolder: `${process.cwd()}/demo/build`,
    middleware: [{
        directories: ['/**/*.html.hbs'],
        run: require('./middleware/handlebars'),
        configuration: {
            templateData: {
                test: "test data"
            },
            batch: [`${process.cwd()}/demo/source/layouts`, `${process.cwd()}/demo/source/partials`],
            helpers: {}
        }
    }, {
        directories: ['/assets/css/**/*.scss'],
        run: require('./middleware/sass')
    }, {
        directories: {
            include: ['/assets/img/**/*'],
            exclude: ['/assets/img/svgs/**/*']
        },
        run: require('./middleware/images')
    }, {
        run: require('./middleware/icons'),
        configuration: {
            targetFolder: '/assets/img/svgs/icon-src',
            targetCSSName: '/assets/img/svgs/icon.css',
            template: '/assets/img/svgs/icon.css.hbs'
        },
        watch: false
    }, {
        run: require('./middleware/support-svg-images'),
        configuration: {
            targetFolder: '/assets/img/svgs/support-src',
            targetCSSName: '/assets/img/svgs/support.css',
            template: '/assets/img/svgs/support.css.hbs',
            selectors: iconOptions.test.selectors,
            colors: iconOptions.test.colors
        },
        watch: false
    }, {
        directories: ['/assets/img/svgs/support.css', '/assets/img/svgs/icon.css'],
        run: require('./middleware/concat-files'),
        configuration: {
            outputFolder: '/assets/css/',
            fileName: 'svg.css'
        },
        watch: false
    }, {
        directories: ['/assets/img/svgs/support-src-colorfy', '/assets/img/svgs/support.css', '/assets/img/svgs/icon.css'],
        run: require('./middleware/clean-files'),
        watch: false
    }, {
        run: require('./middleware/webpack'),
        configuration: {
            webpackConfig: webpackConfig
        },
        watch: false
    }]
};

module.exports = configuration;