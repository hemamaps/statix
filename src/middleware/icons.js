var vfs = require('vinyl-fs');
var DirectoryEncoder = require('directory-encoder');
var map = require('map-stream');
module.exports = function(sourceFolder, targetFolder, configuration, filePathsArg) {
    var de = new DirectoryEncoder(
        `${sourceFolder}${configuration.targetFolder}`,
        `${sourceFolder}${configuration.targetCSSName}`,
        {
            prefix: '.icon-',
            templatePrepend: '',
            template: `${sourceFolder}${configuration.template}`,
            templateAppend: '',
            noencodepng: false
        }
    );

    return new Promise(function(resolve, reject) {
        de.encode();
        resolve();
    });
};