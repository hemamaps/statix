var vfs = require('vinyl-fs');
var Plugin = require('./plugin');
var DirectoryColorfy = require('directory-colorfy');

class DirectoryColorfyPlugin extends Plugin {
    run() {
        var filePath = this._getFilePaths(this.configuration.targetFolder);

        var dc = new DirectoryColorfy(
            `${filePath}`,
            `${filePath}-colorfy`,
            {
                dynamicColorOnly: true,
                colors: this.configuration.colors
            });
        return dc.convert();
    }
}

module.exports = DirectoryColorfyPlugin;