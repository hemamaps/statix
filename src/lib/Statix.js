var path = require('path');
var rimraf = require('rimraf');
var ncp = require('ncp');
var connect = require('connect');
var http = require('http');
var connectLiveReload = require('connect-livereload');
var liveReload = require('livereload');
var serveStatic = require('serve-static');
var chokidar = require('chokidar');
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
        var watcher = chokidar.watch(this.config.tmpFolder + '/**/*.*', {
            ignoreInitial: true
        });

        var tmpFolder = this.config.tmpFolder;

        var getFilePath = function(filepath) {
            var filePathIndex = filepath.indexOf(tmpFolder);

            if (filePathIndex > -1) {
                filepath = filepath.slice(tmpFolder.length, filepath.length);
            }

            return filepath;
        };

        watcher
            .on('add', function(path) {
                this.logger.logAdd(getFilePath(path) + ': has been added.');
            }.bind(this))
            .on('change', function(path) {
                this.logger.logUpdate(getFilePath(path) + ': has been updated.');
            }.bind(this))
            .on('unlink', function(path) {
                this.logger.logDelete(getFilePath(path) + ': has been removed.');
            }.bind(this))
    }

    _watchPlugins(plugins) {
        plugins.forEach(function (plugin) {
            if (Array.isArray(plugin)) {
                this._watchPlugins(plugin);
            } else {
                if (plugin.isWatchable === true) {
                    var globs = plugin.getWatchGlobs(this.config.watchFolders);

                    var watcher = chokidar.watch(globs, {
                        ignoreInitial: true
                    });

                    var run = function(path) {
                        plugin.run(path);
                    }

                    watcher
                        .on('add', function(path) {
                            run(path);
                        })
                        .on('change', function(path) {
                            run(path);
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
                    this.logger.logUpdate(`Build finished.`);
                }.bind(this))
            }.bind(this));
        }.bind(this));
    }
}

module.exports = Statix;