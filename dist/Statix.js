'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var connectLiveReload = require('connect-livereload');
var liveReload = require('livereload');
var glob = require('glob');
var fs = require('fs');
var vfs = require('vinyl-fs');
var gaze = require('gaze');

var Statix = function () {
    function Statix(configuration) {
        _classCallCheck(this, Statix);

        this._createConfigurationDefaults(configuration);
        this.middleware = this._configuration.middleware;
        this.watchFunctions = [];
    }

    _createClass(Statix, [{
        key: '_runMiddleware',
        value: function _runMiddleware() {
            var length = this.middleware.length - 1;
            var currentRunning = 0;

            var run = function () {
                this._setUpMiddleware(this.middleware[currentRunning]).then(function () {
                    if (currentRunning < length) {
                        currentRunning++;
                        run();
                    } else {
                        this.watchFunctions.forEach(function (func) {
                            func();
                        });
                    }
                }.bind(this));
            }.bind(this);

            return run();
        }
    }, {
        key: '_setUpMiddleware',
        value: function _setUpMiddleware(middleware) {
            var directories = this._getMiddlewareDirectories(middleware.directories);

            if (middleware.watch !== false) {
                this.watchFunctions.push(function () {
                    gaze(directories, function (err, watcher) {
                        console.log('watching');

                        watcher.on('all', function (event, filepath) {
                            console.log('watcher triggered', filepath);
                            middleware.run(this._configuration.sourceFolder, this._configuration.tmpFolder, middleware.configuration, filepath);
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }

            return middleware.run(this._configuration.sourceFolder, this._configuration.tmpFolder, middleware.configuration, directories);
        }
    }, {
        key: '_getMiddlewareDirectories',
        value: function _getMiddlewareDirectories(middlewareDirectories) {
            var directories = middlewareDirectories;

            if (middlewareDirectories === undefined) {
                return [];
            }

            if (middlewareDirectories.include) {
                directories = [];
                middlewareDirectories.include.forEach(function (path) {
                    directories.push('' + path);
                });
            }

            if (middlewareDirectories.exclude) {
                middlewareDirectories.exclude.forEach(function (path) {
                    directories.push('!' + path);
                });
            }

            directories.forEach(function (directory, i) {
                if (directory.slice(0, 1) === '!') {
                    directory = directory.slice(1, directory.length);
                    directories[i] = '!' + this._configuration.sourceFolder + directory;
                } else {
                    directories[i] = '' + this._configuration.sourceFolder + directory;
                }
            }.bind(this));

            return directories;
        }
    }, {
        key: '_createConfigurationDefaults',
        value: function _createConfigurationDefaults(configuration) {
            this._configuration = configuration;
            this._configuration.tmpFolder = process.cwd() + '/.tmp';

            if (isNaN(this._configuration.port) === false) {
                this._configuration.port = 9000;
            }
        }
    }, {
        key: '_initiateLiveReload',
        value: function _initiateLiveReload() {
            var server = liveReload.createServer();
            server.watch(this._configuration.tmpFolder);
        }
    }, {
        key: 'server',
        value: function server() {
            this._runMiddleware();

            var app = connect();
            if (this._configuration.useFileWatch === true) {
                app.use(connectLiveReload());
                this._initiateLiveReload();
            }

            app.use(serveStatic(this._configuration.tmpFolder));

            var server = http.createServer(app).listen(this._configuration.port);
        }
    }, {
        key: 'build',
        value: function build() {
            console.log('building');
        }
    }]);

    return Statix;
}();

module.exports = Statix;
//# sourceMappingURL=Statix.js.map