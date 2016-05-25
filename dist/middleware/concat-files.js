'use strict';

var vfs = require('vinyl-fs');
var concat = require('gulp-concat');
var map = require('map-stream');
module.exports = function (sourceFolder, targetFolder, configuration, filePathsArg) {

    return new Promise(function (resolve, reject) {
        return vfs.src(filePathsArg).pipe(concat(configuration.fileName)).pipe(vfs.dest('' + targetFolder + configuration.outputFolder)).on('finish', function () {
            resolve();
        });
    });
};
//# sourceMappingURL=concat-files.js.map