'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chalk = require('chalk');

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, [{
        key: 'log',
        value: function log(message) {
            console.log(message);
        }
    }, {
        key: 'logDelete',
        value: function logDelete(message) {
            console.log(chalk.red(message));
        }
    }, {
        key: 'logUpdate',
        value: function logUpdate(message) {
            console.log(chalk.blue(message));
        }
    }, {
        key: 'logAdd',
        value: function logAdd(message) {
            console.log(chalk.green(message));
        }
    }]);

    return Logger;
}();

module.exports = Logger;
//# sourceMappingURL=logger.js.map