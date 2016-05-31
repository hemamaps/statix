var Plugin = require('./plugin');

class WatchablePlugin extends Plugin {
    constructor(configuration, watchConfiguration) {
        super(configuration);
        this.isWatchable = true;
        this.watchConfiguration = watchConfiguration;
    }

    getWatchGlobs(watchFolders, patterns) {
        var globbedFolders = [];
        var formatFolder = function(watchFolder, dirFolder) {
            return `${watchFolder}${dirFolder}`;
        };

        watchFolders.forEach(function(watchFolder) {
            if (Array.isArray(patterns)) {
                patterns.forEach(function(dirFolder) {
                    globbedFolders.push(formatFolder(watchFolder, dirFolder));
                });
            } else {
                globbedFolders.push(formatFolder(watchFolder, patterns));
            }
        });

        return globbedFolders;
    }
    
}

module.exports = WatchablePlugin;