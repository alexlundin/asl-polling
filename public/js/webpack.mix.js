let mix = require('laravel-mix');
require('laravel-mix-polyfill')
require('laravel-mix-eslint')

const ESLintPlugin = require('eslint-webpack-plugin');

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery']
});


mix.js('src/poll.js', 'prod/js/poll.js')
    .extract(['react'])
    .eslint({
        fix: true,
        extensions: ['js']
    });

mix.disableNotifications();
