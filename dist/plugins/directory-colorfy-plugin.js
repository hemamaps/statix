'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vfs = require('vinyl-fs');
var Plugin = require('./plugin');
var DirectoryColorfy = require('directory-colorfy');

var DirectoryColorfyPlugin = function (_Plugin) {
    _inherits(DirectoryColorfyPlugin, _Plugin);

    function DirectoryColorfyPlugin() {
        _classCallCheck(this, DirectoryColorfyPlugin);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DirectoryColorfyPlugin).apply(this, arguments));
    }

    _createClass(DirectoryColorfyPlugin, [{
        key: 'run',
        value: function run() {
            var filePath = this._getFilePaths(this.configuration.targetFolder);

            var dc = new DirectoryColorfy('' + filePath, filePath + '-colorfy', {
                dynamicColorOnly: true,
                colors: this.configuration.colors
            });
            return dc.convert();
        }
    }]);

    return DirectoryColorfyPlugin;
}(Plugin);

module.exports = DirectoryColorfyPlugin;
//# sourceMappingURL=directory-colorfy-plugin.js.map