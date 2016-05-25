'use strict';

var vfs = require('vinyl-fs');
var map = require('map-stream');

module.exports = function (sourceFolder, targetFolder, configuration, filePathsArg) {
    return new Promise(function (resolve, reject) {
        vfs.src(filePathsArg, { base: sourceFolder }).pipe(vfs.dest(targetFolder)).on('finish', function () {
            resolve();
        });
    });
};
//# sourceMappingURL=fonts.js.map