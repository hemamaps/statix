'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vfs = require('vinyl-fs');
var Plugin = require('./plugin');
var concat = require('gulp-concat');

var ConcatFilesPlugin = function (_Plugin) {
    _inherits(ConcatFilesPlugin, _Plugin);

    function ConcatFilesPlugin() {
        _classCallCheck(this, ConcatFilesPlugin);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ConcatFilesPlugin).apply(this, arguments));
    }

    _createClass(ConcatFilesPlugin, [{
        key: 'run',
        value: function run() {
            return new Promise(function (resolve, reject) {
                var files = this._getFilePaths(this.configuration.files);
                var destination = '' + this.destinationFolder + this.configuration.outputFolder;
                var fileName = this.configuration.fileName;

                vfs.src(files).pipe(concat(fileName)).pipe(vfs.dest(destination)).on('finish', function () {
                    resolve();
                });
            }.bind(this));
        }
    }]);

    return ConcatFilesPlugin;
}(Plugin);

module.exports = ConcatFilesPlugin;
//# sourceMappingURL=concat-files-plugin.js.map