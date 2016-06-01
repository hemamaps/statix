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
        var files = [];
        if (Array.isArray(directories) === true) {
            files = directories.slice();
        } else if(typeof directories === 'string') {
            files = directories;
        } else {
            if (directories.include) {
                files = directories.include;
            }

            if (directories.exclude) {
                directories.exclude.forEach(function (path) {
                    files.push(`!${path}`);
                });
            }
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