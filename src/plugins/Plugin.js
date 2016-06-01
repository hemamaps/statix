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

        var formatFilePath = function(sourceFolder, file) {
            if (file.indexOf('!') === 0) {
                return '!' +  sourceFolder + file.slice(1, file.length);
            } else {
                return '' + sourceFolder + file;
            }
        }

        if (Array.isArray(files)) {
            for (var i = 0; i < files.length; i++) {
                files[i] = formatFilePath(this.sourceFolder, files[i]);
            }
            return files;
        } else {
            return formatFilePath(this.sourceFolder, files);
        }
    }

}

module.exports = Plugin;