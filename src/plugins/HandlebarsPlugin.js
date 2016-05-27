var handlebars = require('gulp-compile-handlebars');
var layouts = require('handlebars-layouts');
var fs = require('fs');
var vfs = require('vinyl-fs');
var map = require('map-stream');
var Plugin = require('./Plugin');
var rename = require('gulp-rename');

class HandlebarsPlugin extends Plugin {
    run() {
        var files = this._getFilePaths(this.configuration.directories);

        var templateData = {
            data: this.configuration.templateData
        };

        var options = {
            batch: this._getFilePaths(this.configuration.batch),
            helpers: this.configuration.helpers
        };

        handlebars.Handlebars.registerHelper(layouts(handlebars.Handlebars));
        return new Promise(function(resolve, reject) {
            vfs.src(files)
                .pipe(handlebars(templateData, options))
                .pipe(rename(function(path) {
                    path.extname = '';
                }))
                .pipe(vfs.dest(this.destinationFolder))
                .on('finish', function() {
                    console.log('test 2');
                    resolve();
                });
        }.bind(this));
    }

}

module.exports = HandlebarsPlugin;