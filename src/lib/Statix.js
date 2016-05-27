var path = require('path');

class Statix {
    constructor(configuration) {
        this._setConfiguration(configuration);
    }

    _setConfiguration(configuration) {
        this.plugins = configuration.plugins;
        this.config = configuration;
        this.config.tmpFolder = path.normalize(`${__dirname}/../../.server-tmp`);
        this.config.buildTmpFolder = path.normalize(`${__dirname}/../../.build-tmp`);
    }

    _runPlugins(plugins) {
        var length = plugins.length - 1;
        var currentRunning = 0;

        return new Promise(function(resolve, reject) {
            var handleAfterRun = function() {
                if (currentRunning < length) {
                    currentRunning ++;
                    run();
                } else {
                    resolve();
                }
            };

            var run = function () {
                if (Array.isArray(plugins[currentRunning]) === true) {
                    this._runPlugins(plugins[currentRunning]).then(() => {
                        handleAfterRun();
                    });
                } else {
                    plugins[currentRunning].setSourceFolder(this.config.sourceFolder);
                    plugins[currentRunning].setDestinationFolder(this.config.tmpFolder);
                    plugins[currentRunning].run().then(() => {
                        handleAfterRun();
                    });
                }
            }.bind(this);

            run();

        }.bind(this));
    }

    _tmpFolderGeneration(path) {
        return new Promise(function(resolve, reject) {
            this._runPlugins(this.plugins).then(() => {
                resolve();
            });
        }.bind(this));
    }

    _createTmp() {
        console.log('creating tmp folder');
        return this._tmpFolderGeneration(this.config.tmpFolder);
    }

    _createBuildTmp() {

    }

    _initiateServer() {
        console.log('server initiated')
    }

    server() {
        console.log('initiating server');

        this._createTmp().then(() => {
            this._initiateServer();
        });
    }

    build() {
        console.log('initiating build');
    }
}

module.exports = Statix;