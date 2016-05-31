'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vfs = require('vinyl-fs');
var Plugin = require('./plugin');
var DirectoryEncoder = require('directory-encoder');

var DirectoryEncoderPlugin = function (_Plugin) {
    _inherits(DirectoryEncoderPlugin, _Plugin);

    function DirectoryEncoderPlugin() {
        _classCallCheck(this, DirectoryEncoderPlugin);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DirectoryEncoderPlugin).apply(this, arguments));
    }

    _createClass(DirectoryEncoderPlugin, [{
        key: 'run',
        value: function run() {

            return new Promise(function (resolve, reject) {
                var targetFolder = this._getFilePaths(this.configuration.targetFolder);
                var cssFileName = this._getFilePaths(this.configuration.cssFileName);
                var template = this._getFilePaths(this.configuration.template);

                var options = {
                    prefix: this.configuration.prefix,
                    templatePrepend: '',
                    template: template,
                    templateAppend: '',
                    noencodepng: false
                };

                if (this.configuration.selectors) {
                    options.customselectors = this.configuration.selectors;
                }

                var de = new DirectoryEncoder(targetFolder, cssFileName, options);

                de.encode();

                resolve();
            }.bind(this));
        }
    }]);

    return DirectoryEncoderPlugin;
}(Plugin);

module.exports = DirectoryEncoderPlugin;
//# sourceMappingURL=directory-encoder-plugin.js.map