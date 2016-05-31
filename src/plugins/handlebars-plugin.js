var handlebars = require('gulp-compile-handlebars');
var layouts = require('handlebars-layouts');
var vfs = require('vinyl-fs');
var WatchablePlugin = require('./watchable-plugin');
var rename = require('gulp-rename');

class HandlebarsPlugin extends WatchablePlugin {
    run(files) {
        if (files === undefined) {
            files = this._getFilePaths(this.configuration.directories);
        }

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
                    resolve();
                });
        }.bind(this));
    }

    getWatchGlobs(watchFolders) {
        return super.getWatchGlobs(watchFolders, this.watchConfiguration.pattern);
    }
}

module.exports = HandlebarsPlugin;