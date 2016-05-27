var map = require('map-stream');
var vfs = require('vinyl-fs');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var Plugin = require('./Plugin');

class SassPlugin extends Plugin {
    run() {
        var files = this._getFilePaths();

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

}

module.exports = SassPlugin;