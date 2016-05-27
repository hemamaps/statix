'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pluginRunner = require('./lib/plugin-runner'),
    path = require('path');

var Statix = function () {
    function Statix(configuration) {
        _classCallCheck(this, Statix);

        this._setConfiguration(configuration);
    }

    _createClass(Statix, [{
        key: '_setConfiguration',
        value: function _setConfiguration(configuration) {
            this.plugins = configuration.plugins;
            this.config = configuration;
            this.config.tmpFolder = path.normalize(__dirname + '/../.server-tmp');
            this.config.buildTmpFolder = path.normalize(__dirname + '/../.build-tmp');
        }
    }, {
        key: '_runPlugins',
        value: function _runPlugins(plugins) {
            var length = plugins.length - 1;
            var currentRunning = 0;

            return new Promise(function (resolve, reject) {
                var handleAfterRun = function handleAfterRun() {
                    if (currentRunning < length) {
                        currentRunning++;
                        run();
                    } else {
                        resolve();
                    }
                };

                var run = function () {
                    if (Array.isArray(plugins[currentRunning]) === true) {
                        this._runPlugins(plugins[currentRunning]).then(function () {
                            handleAfterRun();
                        });
                    } else {
                        plugins[currentRunning].setSourceFolder(this.config.sourceFolder);
                        plugins[currentRunning].setDestinationFolder(this.config.tmpFolder);
                        plugins[currentRunning].run().then(function () {
                            handleAfterRun();
                        });
                    }
                }.bind(this);

                run();
            }.bind(this));
        }
    }, {
        key: '_tmpFolderGeneration',
        value: function _tmpFolderGeneration(path) {
            return new Promise(function (resolve, reject) {
                this._runPlugins(this.plugins).then(function () {
                    resolve();
                });
            }.bind(this));
        }
    }, {
        key: '_createTmp',
        value: function _createTmp() {
            console.log('creating tmp folder');
            return this._tmpFolderGeneration(this.config.tmpFolder);
        }
    }, {
        key: '_createBuildTmp',
        value: function _createBuildTmp() {}
    }, {
        key: '_initiateServer',
        value: function _initiateServer() {
            console.log('server initiated');
        }
    }, {
        key: 'server',
        value: function server() {
            var _this = this;

            console.log('initiating server');

            this._createTmp().then(function () {
                _this._initiateServer();
            });
        }
    }, {
        key: 'build',
        value: function build() {
            console.log('initiating build');
        }
    }]);

    return Statix;
}();

module.exports = Statix;
//# sourceMappingURL=Statix.js.map