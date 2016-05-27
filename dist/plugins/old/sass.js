'use strict';

var map = require('map-stream');
var vfs = require('vinyl-fs');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
module.exports = function (sourceFolder, targetFolder, configuration, filePathsArg) {
    var promise = new Promise(function (resolve, rej) {
        vfs.src(filePathsArg, { base: sourceFolder }).pipe(sourcemaps.init()).pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)).pipe(sourcemaps.write('/')).pipe(vfs.dest(targetFolder)).on('finish', function () {
            resolve();
        });
    });
    return promise;
};
//# sourceMappingURL=sass.js.map