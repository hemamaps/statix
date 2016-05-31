'use strict';

var CopyPlugin = require('./plugins/copy-plugin'),
    SassPlugin = require('./plugins/sass-plugin'),
    HandlebarsPlugin = require('./plugins/handlebars-plugin'),
    DirectoryColorfyPlugin = require('./plugins/directory-colorfy-plugin'),
    DirectoryEncoderPlugin = require('./plugins/directory-encoder-plugin'),
    ConcatFilesPlugin = require('./plugins/concat-files-plugin'),
    CleanPlugin = require('./plugins/clean-plugin'),
    WebpackPlugin = require('./plugins/webpack-plugin'),
    GroupPlugin = require('./plugins/group-plugin');

module.exports = {
    CopyPlugin: CopyPlugin,
    SassPlugin: SassPlugin,
    HandlebarsPlugin: HandlebarsPlugin,
    DirectoryColorfyPlugin: DirectoryColorfyPlugin,
    DirectoryEncoderPlugin: DirectoryEncoderPlugin,
    ConcatFilesPlugin: ConcatFilesPlugin,
    CleanPlugin: CleanPlugin,
    WebpackPlugin: WebpackPlugin,
    GroupPlugin: GroupPlugin
};
//# sourceMappingURL=plugins.js.map