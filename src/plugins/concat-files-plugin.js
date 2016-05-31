var vfs = require('vinyl-fs');
var Plugin = require('./plugin');
var concat = require('gulp-concat');

class ConcatFilesPlugin extends Plugin {
    run() {
        return new Promise(function(resolve, reject) {
            var files = this._getFilePaths(this.configuration.files);
            var destination = `${this.destinationFolder}${this.configuration.outputFolder}`;
            var fileName = this.configuration.fileName;

            vfs.src(files)
                .pipe(concat(fileName))
                .pipe(vfs.dest(destination))
                .on('finish', function() {
                    resolve();
                });
        }.bind(this))
    }

}

module.exports = ConcatFilesPlugin;