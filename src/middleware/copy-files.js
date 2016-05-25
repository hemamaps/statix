var vfs = require('vinyl-fs');
var map = require('map-stream');

module.exports = function(sourceFolder, targetFolder, configuration, filePathsArg) {
    var files = filePathsArg;

    if (filePathsArg.include) {
        var files = filePathsArg.include;
    }

    if (filePathsArg.exclude) {
        filePathsArg.exclude.forEach(function(path) {
            files.push(`!${path}`);
        });
    }

    return new Promise(function(resolve, reject) {
        vfs.src(files, {base: sourceFolder})
            .pipe(vfs.dest(targetFolder))
            .on('finish', function() {
                resolve();
            });
    });
};