var vfs = require('vinyl-fs');
var Plugin = require('./plugin');
var DirectoryEncoder = require('directory-encoder');

class DirectoryEncoderPlugin extends Plugin {
    run() {

        return new Promise(function(resolve, reject) {
            var targetFolder = this._getFilePaths(this.configuration.targetFolder);
            var cssFileName = this._getFilePaths(this.configuration.cssFileName);
            var template = this._getFilePaths(this.configuration.template);

            var options = {
                prefix: this.configuration.prefix,
                templatePrepend: '',
                template: template,
                templateAppend: '',
                noencodepng: false
            };

            if (this.configuration.selectors) {
                options.customselectors = this.configuration.selectors
            }

            var de = new DirectoryEncoder(
                targetFolder,
                cssFileName,
                options
            );

            de.encode();

            resolve();
        }.bind(this));
    }
}

module.exports = DirectoryEncoderPlugin;