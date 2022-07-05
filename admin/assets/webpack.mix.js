let mix = require('laravel-mix');
require('laravel-mix-polyfill')
require('laravel-mix-eslint')

const ESLintPlugin = require('eslint-webpack-plugin');

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery']
});


mix.js('src/admin.js', 'prod/js/admin.js')
    .extract(['react'])
    .eslint({
        fix: true,
        extensions: ['js']
    });

mix.sass('src/sass/admin.scss', 'prod/css/admin.css')

mix.disableNotifications();
