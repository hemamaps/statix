'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vfs = require('vinyl-fs');
var WatchablePlugin = require('./watchable-plugin');

var CopyPlugin = function (_WatchablePlugin) {
    _inherits(CopyPlugin, _WatchablePlugin);

    function CopyPlugin() {
        _classCallCheck(this, CopyPlugin);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CopyPlugin).apply(this, arguments));
    }

    _createClass(CopyPlugin, [{
        key: '_run',
        value: function _run(files) {
            return new Promise(function (resolve, reject) {
                vfs.src(files, { base: this.sourceFolder }).pipe(vfs.dest(this.destinationFolder)).on('finish', function () {
                    resolve();
                });
            }.bind(this));
        }
    }, {
        key: 'run',
        value: function run() {
            var files = this._getFilePaths(this.configuration.directories);
            return this._run(files);
        }
    }, {
        key: 'getWatchGlobs',
        value: function getWatchGlobs(watchFolders) {
            return _get(Object.getPrototypeOf(CopyPlugin.prototype), 'getWatchGlobs', this).call(this, watchFolders, this.watchConfiguration.pattern);
        }
    }]);

    return CopyPlugin;
}(WatchablePlugin);

module.exports = CopyPlugin;
//# sourceMappingURL=copy-plugin.js.map