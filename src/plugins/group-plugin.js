var WatchablePlugin = require('./watchable-plugin');

class GroupPlugin extends WatchablePlugin {
    _runPlugins(plugins, path) {
        var length = plugins.length - 1;
        var currentRunning = 0;

        return new Promise(function(resolve, reject) {
            var handleAfterRun = function(plugin) {
                if (currentRunning < length) {
                    currentRunning ++;
                    run();
                } else {
                    resolve();
                }
            };

            var run = function () {
                if (Array.isArray(plugins[currentRunning]) === true) {
                    this._runPlugins(plugins[currentRunning], path).then(() => {
                        handleAfterRun();
                    });
                } else {
                    plugins[currentRunning].setSourceFolder(this.sourceFolder);
                    plugins[currentRunning].setDestinationFolder(path);
                    plugins[currentRunning].run().then(() => {
                        handleAfterRun();
                    });
                }
            }.bind(this);

            run();

        }.bind(this));
    }

    run() {
        return this._runPlugins(this.configuration.plugins, this.destinationFolder);
    }

    getWatchGlobs(watchFolders) {
        return super.getWatchGlobs(watchFolders, this.watchConfiguration.pattern);
    }
}

module.exports = GroupPlugin;