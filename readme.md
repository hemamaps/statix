# Statix
A configurable static site generator used for our front end projects.

## BUILD
Built on ES6 and uses babel
to compile down to ES5

1. Run `npm run build`

## DEMO
1. Run `npm run demo`

## Use in project
1. `npm install hemamaps/statix`
2. Add to index.js
```
var Statix = require('./Statix');
var options = {
    useFileWatch: true,
    port: 9000,
    sourceFolder: `${process.cwd()}/demo/source`,
    outputFolder: `${process.cwd()}/demo/build`,
    middleware: [{
        directories: ['/**/*.html.hbs'],
        run: require('static/dist/middleware/handlebars'),
        configuration: {
            templateData: {
                test: "test data"
            },
            batch: [`${process.cwd()}/demo/source/layouts`, `${process.cwd()}/demo/source/partials`],
            helpers: {}
        }
    }, {
        directories: ['/assets/css/**/*.scss'],
        run: require('static/dist/middleware/sass')
    }]
};

var statix = new Statix(options);

statix.server();

```
3. Run `node index.js`

_More documentation to come_