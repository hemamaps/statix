var handlebars = require('gulp-compile-handlebars');
var layouts = require('handlebars-layouts');
var fs = require('fs');
var vfs = require('vinyl-fs');
var map = require('map-stream');
var Plugin = require('./Plugin');
var rename = require('gulp-rename');

class HandlebarsPlugin extends Plugin {
    run() {
        var files = this._getFilePaths();

        var templateData = {
            data: this.configuration.templateData
        };

        var options = {
            batch: this.configuration.batch,
            helpers: this.configuration.helpers
        };

        handlebars.Handlebars.registerHelper(layouts(handlebars.Handlebars));

        return new Promise(function(resolve, reject) {
            vfs.src(files)
                .pipe(rename(function(path) {
                    console.log(path);
                    path.extname = '';
                }))
                .pipe(handlebars(templateData, options))
                .pipe(vfs.dest(this.destinationFolder))
                .on('finish', function() {
                    console.log('test 2');
                    resolve();
                });
        }.bind(this));
    }

}

module.exports = HandlebarsPlugin;