var statixPlugins = require('./statix').plugins;

module.exports = {
    useFileWatch: true,
    port: 8000,
    sourceFolder: `${process.cwd()}/demo/source`,
    outputFolder: `${process.cwd()}/demo/build`,
    watchFolders: [`${process.cwd()}/demo/source`, `${process.cwd()}/hema_modules`],
    plugins: [
        [
            new statixPlugins.SassPlugin({
                directories: ['/assets/**/*.scss']
            }),
            new statixPlugins.HandlebarsPlugin({
                directories: ['/**/*.html.hbs'],
                templateData: { test: 'test example'},
                batch: [`/layouts`, `/partials`]
            })
        ],
        new statixPlugins.CopyPlugin({
            directories: ['/**/*.png']
        }),
    ]
};
