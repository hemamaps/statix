var vfs = require('vinyl-fs');
var clean = require('gulp-clean');
var map = require('map-stream');
module.exports = function(sourceFolder, targetFolder, configuration, filePathsArg) {


    return new Promise(function(resolve, reject) {
        vfs.src(filePathsArg)
            .pipe(clean())
            .on('finish', function() {
                resolve();
            });
    });
};