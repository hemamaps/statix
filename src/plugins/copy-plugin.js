var vfs = require('vinyl-fs');
var WatchablePlugin = require('./watchable-plugin');

class CopyPlugin extends WatchablePlugin {
    _run(files) {
        return new Promise(function(resolve, reject) {
            vfs.src(files, {base: this.sourceFolder})
                .pipe(vfs.dest(this.destinationFolder))
                .on('finish', function() {
                    resolve();
                });
        }.bind(this));
    }

    run(files) {
        if (files === undefined) {
            files = this._getFilePaths(this.configuration.directories);
        }
        return this._run(files);
    }
    
    getWatchGlobs(watchFolders) {
        return super.getWatchGlobs(watchFolders, this.watchConfiguration.pattern);
    }
}

module.exports = CopyPlugin;