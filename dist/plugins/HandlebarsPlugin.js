'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var handlebars = require('gulp-compile-handlebars');
var layouts = require('handlebars-layouts');
var fs = require('fs');
var vfs = require('vinyl-fs');
var map = require('map-stream');
var Plugin = require('./Plugin');
var rename = require('gulp-rename');

var HandlebarsPlugin = function (_Plugin) {
    _inherits(HandlebarsPlugin, _Plugin);

    function HandlebarsPlugin() {
        _classCallCheck(this, HandlebarsPlugin);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HandlebarsPlugin).apply(this, arguments));
    }

    _createClass(HandlebarsPlugin, [{
        key: 'run',
        value: function run() {
            var files = this._getFilePaths(this.configuration.directories);

            var templateData = {
                data: this.configuration.templateData
            };

            var options = {
                batch: this._getFilePaths(this.configuration.batch),
                helpers: this.configuration.helpers
            };

            handlebars.Handlebars.registerHelper(layouts(handlebars.Handlebars));
            return new Promise(function (resolve, reject) {
                vfs.src(files).pipe(handlebars(templateData, options)).pipe(rename(function (path) {
                    path.extname = '';
                })).pipe(vfs.dest(this.destinationFolder)).on('finish', function () {
                    resolve();
                });
            }.bind(this));
        }
    }]);

    return HandlebarsPlugin;
}(Plugin);

module.exports = HandlebarsPlugin;
//# sourceMappingURL=HandlebarsPlugin.js.map