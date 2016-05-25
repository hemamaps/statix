var webpack = require('webpack');

module.exports = function(sourceFolder, targetFolder, configuration, filePathsArg) {
    return new Promise(function(resolve, reject) {
        debugger;
        webpack(configuration.webpackConfig, function(err, stats) {
            if (err) {
                console.log(err);
            }
            resolve();
        });

    });
};