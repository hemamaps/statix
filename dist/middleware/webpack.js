'use strict';

var webpack = require('webpack');

module.exports = function (sourceFolder, targetFolder, configuration, filePathsArg) {
    return new Promise(function (resolve, reject) {
        debugger;
        configuration.webpackConfig.output.path = '' + targetFolder + configuration.webpackConfig.output.path;
        webpack(configuration.webpackConfig, function (err, stats) {
            if (err) {
                console.log(err);
            }
            resolve();
        });
    });
};
//# sourceMappingURL=webpack.js.map