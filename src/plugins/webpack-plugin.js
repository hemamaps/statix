var Plugin = require('./plugin');
var webpack = require('webpack');

class WebpackPlugin extends Plugin {
    run() {
        this.configuration.configuration.output.path = `${this.destinationFolder}${this.configuration.configuration.output.path}`;

        return new Promise(function(resolve, reject) {
            webpack(this.configuration.configuration, function(err, stats) {
                if (err) {
                    console.log(err);
                }
                resolve();
            });
        }.bind(this))
    }

}

module.exports = WebpackPlugin;