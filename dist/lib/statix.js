'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Statix = function () {
    function Statix(configuration) {
        _classCallCheck(this, Statix);

        this._setConfiguration(configuration);
        this.logger = new Logger();
    }

    _createClass(Statix, [{
        key: '_setConfiguration',
        value: function _setConfiguration(configuration) {
            this.plugins = configuration.plugins;
            this.config = configuration;
            this.config.tmpFolder = path.normalize(__dirname + '/../../.tmp-server');
            this.config.buildTmpFolder = path.normalize(__dirname + '/../../.tmp-build');
        }
    }, {
        key: '_runPlugins',
        value: function _runPlugins(plugins, path) {
            var length = plugins.length - 1;
            var currentRunning = 0;

            return new Promise(function (resolve, reject) {
                var handleAfterRun = function handleAfterRun(plugin) {
                    if (currentRunning < length) {
                        currentRunning++;
                        run();
                    } else {
                        resolve();
                    }
                };

                var run = function () {
                    if (Array.isArray(plugins[currentRunning]) === true) {
                        this._runPlugins(plugins[currentRunning], path).then(function () {
                            handleAfterRun();
                        });
                    } else {
                        plugins[currentRunning].setSourceFolder(this.config.sourceFolder);
                        plugins[currentRunning].setDestinationFolder(path);
                        plugins[currentRunning].run().then(function () {
                            handleAfterRun();
                        });
                    }
                }.bind(this);

                run();
            }.bind(this));
        }
    }, {
        key: '_watchTmp',
        value: function _watchTmp() {
            var watcher = chokidar.watch(this.config.tmpFolder + '/**/*.*', {
                ignoreInitial: true
            });

            var tmpFolder = this.config.tmpFolder;

            var getFilePath = function getFilePath(filepath) {
                var filePathIndex = filepath.indexOf(tmpFolder);

                if (filePathIndex > -1) {
                    filepath = filepath.slice(tmpFolder.length, filepath.length);
                }

                return filepath;
            };

            watcher.on('add', function (path) {
                this.logger.logAdd(getFilePath(path) + ': has been added.');
            }.bind(this)).on('change', function (path) {
                this.logger.logUpdate(getFilePath(path) + ': has been updated.');
            }.bind(this)).on('unlink', function (path) {
                this.logger.logDelete(getFilePath(path) + ': has been removed.');
            }.bind(this));
        }
    }, {
        key: '_watchPlugins',
        value: function _watchPlugins(plugins) {
            plugins.forEach(function (plugin) {
                if (Array.isArray(plugin)) {
                    this._watchPlugins(plugin);
                } else {
                    if (plugin.isWatchable === true) {
                        var globs = plugin.getWatchGlobs(this.config.watchFolders);

                        var watcher = chokidar.watch(globs, {
                            ignoreInitial: true
                        });

                        var run = function run(path) {
                            plugin.run(path);
                        };

                        watcher.on('add', function (path) {
                            run(path);
                        }).on('change', function (path) {
                            run(path);
                        });
                    }
                }
            }.bind(this));
        }
    }, {
        key: '_tmpFolderGeneration',
        value: function _tmpFolderGeneration(path) {
            return new Promise(function (resolve, reject) {
                var _this = this;

                this._runPlugins(this.plugins, path).then(function () {
                    resolve();
                }).then(function () {
                    if (_this.config.useFileWatch === true) {
                        _this._watchPlugins(_this.plugins);
                        _this._watchTmp();
                    }
                });
            }.bind(this));
        }
    }, {
        key: '_createTmp',
        value: function _createTmp() {
            return this._tmpFolderGeneration(this.config.tmpFolder);
        }
    }, {
        key: '_createBuildTmp',
        value: function _createBuildTmp() {
            return this._tmpFolderGeneration(this.config.buildTmpFolder);
        }
    }, {
        key: '_removeBuildTmp',
        value: function _removeBuildTmp() {
            return new Promise(function (resolve, reject) {
                rimraf(this.config.buildTmpFolder, function () {});
            }.bind(this));
        }
    }, {
        key: '_compareBuildTmpToCurrentBuild',
        value: function _compareBuildTmpToCurrentBuild() {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    }, {
        key: '_copyBuildTmpToCurrentBuild',
        value: function _copyBuildTmpToCurrentBuild() {
            return new Promise(function (resolve, reject) {
                rimraf(this.config.outputFolder, function () {
                    ncp(this.config.buildTmpFolder, this.config.outputFolder, function (err) {
                        if (err) {
                            console.error(err);
                        }
                        this._removeBuildTmp();
                        resolve();
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }
    }, {
        key: '_initiateServer',
        value: function _initiateServer() {
            this.logger.logUpdate('Server started on localhost:' + this.config.port);
            var app = connect();

            if (this.config.useFileWatch === true) {
                app.use(connectLiveReload());
                this._initiateLiveReload();
            }

            app.use(serveStatic(this.config.tmpFolder));

            var server = http.createServer(app).listen(this.config.port);
        }
    }, {
        key: '_initiateLiveReload',
        value: function _initiateLiveReload() {
            var server = liveReload.createServer();
            server.watch(this.config.tmpFolder);
        }
    }, {
        key: 'server',
        value: function server() {
            var _this2 = this;

            this._createTmp().then(function () {
                _this2._initiateServer();
            });
        }
    }, {
        key: 'build',
        value: function build() {
            this._createBuildTmp().then(function () {
                this._compareBuildTmpToCurrentBuild().then(function () {
                    this._copyBuildTmpToCurrentBuild().then(function () {
                        this.logger.logUpdate('Build finished.');
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }
    }]);

    return Statix;
}();

module.exports = Statix;
//# sourceMappingURL=statix.js.map