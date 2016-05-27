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
        var files = directories;
        if (directories.include) {
            var files = directories.include;
        }

        if (directories.exclude) {
            directories.exclude.forEach(function(path) {
                files.push(`!${path}`);
            });
        }

        for (var i = 0; i < files.length;i++) {
            files[i] = `${this.sourceFolder}${files[i]}`;
        }

        return files;
    }
}

module.exports = Plugin;