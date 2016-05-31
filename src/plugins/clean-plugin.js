var vfs = require('vinyl-fs');
var Plugin = require('./plugin');
var clean = require('gulp-clean');

class CleanPlugin extends Plugin {
    run(files) {

        return new Promise(function(resolve, reject) {
            if (files === undefined) {
                files = this._getFilePaths(this.configuration.directories);
            }

            vfs.src(files)
                .pipe(clean())
                .on('finish', function() {
                    resolve();
                });
        }.bind(this))
    }
}

module.exports = CleanPlugin;