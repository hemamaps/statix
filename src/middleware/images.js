var vfs = require('vinyl-fs');
var map = require('map-stream');
module.exports = function(sourceFolder, targetFolder, configuration, filePathsArg) {
    var images = filePathsArg;
    
    if (filePathsArg.include) {
        var images = filePathsArg.include;
    }

    if (filePathsArg.exclude) {
        filePathsArg.exclude.forEach(function(path) {
            images.push(`!${path}`);
        });
    }

    return new Promise(function(resolve, reject) {
        vfs.src(images, {base: sourceFolder})
            .pipe(vfs.dest(targetFolder))
            .on('finish', function() {
                resolve();
            });
     });
};