'use strict';

var vfs = require('vinyl-fs');
var DirectoryEncoder = require('directory-encoder');
var DirectoryColorfy = require('directory-colorfy');

module.exports = function (sourceFolder, targetFolder, configuration, filePathsArg) {

    var dc = new DirectoryColorfy('' + sourceFolder + configuration.targetFolder, '' + sourceFolder + configuration.targetFolder + '-colorfy', {
        dynamicColorOnly: true,
        colors: configuration.colors
    });

    return dc.convert().then(function () {
        var de = new DirectoryEncoder('' + sourceFolder + configuration.targetFolder + '-colorfy', '' + sourceFolder + configuration.targetCSSName, {
            customselectors: configuration.selectors,
            prefix: '.support-',
            templatePrepend: '',
            template: '' + sourceFolder + configuration.template,
            templateAppend: '',
            noencodepng: false
        });
        de.encode();
    });
};
//# sourceMappingURL=support-svg-images.js.map