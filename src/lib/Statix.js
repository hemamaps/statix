var path = require('path');
var rimraf = require('rimraf');
var ncp = require('ncp');
var connect = require('connect');
var http = require('http');
var connectLiveReload = require('connect-livereload');
var liveReload = require('livereload');
var serveStatic = require('serve-static');
var gaze = require('gaze');
var Logger = require('./logger');

class Statix {
    constructor(configuration) {
        this._setConfiguration(configuration);
        this.logger = new Logger();
    }

    _setConfiguration(configuration) {
        this.plugins = configuration.plugins;
        this.config = configuration;
        this.config.tmpFolder = path.normalize(`${__dirname}/../../.tmp-server`);
        this.config.buildTmpFolder = path.normalize(`${__dirname}/../../.tmp-build`);
    }

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
                    plugins[currentRunning].setSourceFolder(this.config.sourceFolder);
                    plugins[currentRunning].setDestinationFolder(path);
                    plugins[currentRunning].run().then(() => {
                        handleAfterRun();
                    });
                }
            }.bind(this);

            run();

        }.bind(this));
    }

    _watchTmp() {
        gaze(`${this.config.tmpFolder}/**/*.*`, function(err, watcher) {
            watcher.on('all', function(event, filepath) {
                var filePathIndex = filepath.indexOf(this.config.tmpFolder);

                if (filePathIndex > -1) {
                    filepath = filepath.slice(this.config.tmpFolder.length, filepath.length)
                }

                if (event === 'changed') {
                    this.logger.logUpdate(`${filepath}: has been updated.`);
                } else if (event === 'added') {
                    this.logger.logAdd(`${filepath}: has been added.`);
                } else if (event ==='deleted') {
                    this.logger.logDelete(`${filepath}: has been removed.`);
                }
            }.bind(this));
        }.bind(this))
    }

    _watchPlugins(plugins) {
        plugins.forEach(function(plugin) {
            if (Array.isArray(plugin)) {
                this._watchPlugins(plugin)
            } else {
                if (plugin.isWatchable === true) {
                    gaze(plugin.getWatchGlobs(this.config.watchFolders), function(err, watcher) {
                        watcher.on('all', function(event, filepath) {
                            plugin.run(filepath);
                        }.bind(this));
                    });
                }
            }
        }.bind(this));

    }

    _tmpFolderGeneration(path) {
        return new Promise(function(resolve, reject) {
            this._runPlugins(this.plugins, path).then(() => {
                resolve();
            }).then(() => {
                if (this.config.useFileWatch === true) {
                    this._watchPlugins(this.plugins);
                    this._watchTmp();
                }
            });
        }.bind(this));
    }

    _createTmp() {
        return this._tmpFolderGeneration(this.config.tmpFolder);
    }

    _createBuildTmp() {
        return this._tmpFolderGeneration(this.config.buildTmpFolder);
    }

    _removeBuildTmp() {
        return new Promise(function(resolve, reject) {
            rimraf(this.config.buildTmpFolder, function() {

            });
        }.bind(this));
    }

    _compareBuildTmpToCurrentBuild() {
        return new Promise(function(resolve, reject) {
            resolve();
        });
    }

    _copyBuildTmpToCurrentBuild() {
        return new Promise(function(resolve, reject) {
            rimraf(this.config.outputFolder, function() {
                ncp(this.config.buildTmpFolder, this.config.outputFolder, function(err) {
                    if (err) {
                        console.error(err);
                    }
                    this._removeBuildTmp();
                    resolve();
                }.bind(this));
            }.bind(this));
        }.bind(this));
    }

    _initiateServer() {
        this.logger.logUpdate(`Server started on localhost:${this.config.port}`);
        var app = connect();

        if (this.config.useFileWatch === true) {
            app.use(connectLiveReload());
            this._initiateLiveReload();
        }

        app.use(serveStatic(this.config.tmpFolder));

        var server = http.createServer(app).listen(this.config.port);
    }

    _initiateLiveReload() {
        var server = liveReload.createServer();
        server.watch(this.config.tmpFolder);
    }

    server() {
        this._createTmp().then(() => {
            this._initiateServer();
        });
    }

    build() {
        this._createBuildTmp().then(function() {
            this._compareBuildTmpToCurrentBuild().then(function() {
                this._copyBuildTmpToCurrentBuild().then(function() {
                }.bind(this))
            }.bind(this));
        }.bind(this));
    }
}

module.exports = Statix;