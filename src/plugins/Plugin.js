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

    _getFilePaths() {
        var files = this.configuration.directories;
        if (this.configuration.directories.include) {
            var files = this.configuration.directories.include;
        }

        if (this.configuration.directories.exclude) {
            this.configuration.directories.exclude.forEach(function(path) {
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