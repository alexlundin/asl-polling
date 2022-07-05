const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'asl-poll-block': './src/asl-poll-block.js'
    },
    output: {
        path: path.join(__dirname, '/build/js'),
        filename: '[name].js'
    }
}
