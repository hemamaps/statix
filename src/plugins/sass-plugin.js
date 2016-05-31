var vfs = require('vinyl-fs');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var WatchablePlugin = require('./watchable-plugin');

class SassPlugin extends WatchablePlugin {
    run() {
        var files = this._getFilePaths(this.configuration.directories);

        return new Promise(function(resolve, reject) {
            vfs.src(files, {base: this.sourceFolder})
                .pipe(sourcemaps.init())
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
                .pipe(sourcemaps.write('/'))
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

module.exports = SassPlugin;