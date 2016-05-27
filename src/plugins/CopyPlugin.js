var vfs = require('vinyl-fs');
var map = require('map-stream');
var Plugin = require('./Plugin');

class CopyPlugin extends Plugin {
    run() {
        var files = this._getFilePaths();

        return new Promise(function(resolve, reject) {
            vfs.src(files, {base: this.sourceFolder})
                .pipe(vfs.dest(this.destinationFolder))
                .on('finish', function() {
                    resolve();
                });
        }.bind(this));
    }

}

module.exports = CopyPlugin;