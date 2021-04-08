const jsconf = require('./jsconfig.json');
const { resolve } = require('path');

module.exports = {
    presets: [[
        "@babel/preset-env",
        {
            targets: {
                node: "current"
            }
        }
    ]],
    plugins: [[
        'babel-plugin-module-resolver',
        {
            root: [resolve(jsconf.compilerOptions.baseUrl)],
            alias: {
                '@oreo/src': 'src/',
                '@oreo/lib': 'lib/',
                '@oreo/config': 'config/',
            }
        }
    ]]
};