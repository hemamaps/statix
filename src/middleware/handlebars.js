var handlebars = require('handlebars');
var hbLayouts = require('handlebars-layouts');
var fs = require('fs');
var vfs = require('vinyl-fs');
var map = require('map-stream');

var helpers = (function() {
    var isDir = function(filename) {
        var stats = fs.statSync(filename);
        return stats && stats.isDirectory();
    };

    var registerPartials = function(dir, base) {
        base = base || dir;
        fs.readdirSync(dir).forEach(function (basename) {
            var filename = dir + '/' + basename;
            if (isDir(filename)) {
                registerPartials(filename, base);
            } else {
                registerPartial(filename, base);
            }
        }.bind(this));
    };

    var registerPartial  = function(filename, base) {
        if (!isHandleBars(filename)) { return; }
        var name = partialName(filename, base);
        var template = fs.readFileSync(filename, 'utf8');
        handlebars.registerPartial(name, template);
    };

    var isHandleBars = function(filename) {
        return ['hbs'].indexOf(filename.split('.').pop()) !== -1;
    };

    var partialName  = function(filename, base) {
        var name = filename.substr(0, filename.lastIndexOf('.'));
        name = name.replace(new RegExp('^' + base + '\\/'), '');
        return name.substring(name.charAt(0) === '_' ? 1 : 0);
    };

    return {
        isDir,
        registerPartials,
        registerPartial,
        isHandleBars,
        partialName
    }
}());

module.exports = function(sourceFolder, targetFolder, configuration, filePathsArg) {
    handlebars.registerHelper(hbLayouts(handlebars));

    var templateData = {
        data: configuration.templateData
    };

    var options = {
        batch :  configuration.batch,
        helpers : configuration.helpers
    };

    // Go through a partials directory array
    if(options.batch !== undefined && options.batch.length > 0){
        options.batch.forEach(function (dir) {
            helpers.registerPartials(dir, dir);
        }.bind(this));
    }

    var compileHandleBars = function(file, cb) {
        var html = file.contents.toString();
        handlebars.registerHelper(options.helpers);
        var template = handlebars.compile(html);
        var result = template(templateData);
        file.contents = new Buffer(result);
        cb(null, file);
    };

    var rename = function(file, cb) {
        var length = file.basename.length;

        file.basename = file.basename.slice(0, length - 4); // remove .hbs
        cb(null, file);
    };

    var logChange = function(file, cb) {
        cb(null, file);
    };

    var action = function(cb) {
        vfs.src(filePathsArg)
            .pipe(map(compileHandleBars))
            .pipe(map(rename))
            .pipe(vfs.dest(targetFolder))
            .on('finish', function() {
                cb();
            });
    };

    var promise = new Promise(function(resolve, rej) {
        action(resolve);
    });

    return promise;
};