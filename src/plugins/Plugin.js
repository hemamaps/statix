class Plugin {
    constructor(configuration) {
        this.configuration = configuration;
    }

    setSourceFolder(path) {
        this.sourceFolder = path;
    }

    setDestinationFolder(path) {
        this.destinationFolder = path;
    }

    _getFilePaths(directories) {
        var files = directories.slice();

        if (files.include) {
            files = files.include;
        }

        if (files.exclude) {
            files.exclude.forEach(function(path) {
                files.push(`!${path}`);
            });
        }

        if (Array.isArray(files)) {
            for (var i = 0; i < files.length;i++) {
                files[i] = `${this.sourceFolder}${files[i]}`;
            }
            return files;
        } else {
            return `${this.sourceFolder}${files}`
        }
    }

}

module.exports = Plugin;