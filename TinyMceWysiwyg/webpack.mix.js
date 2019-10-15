const mix = require('laravel-mix');

const mceNodePath = './node_modules/tinymce';

mix.js(
    [
        './resources/assets/src/tinymce.js'
    ],
    './resources/assets/js/fieldtype.js')
    .copy(
        `${mceNodePath}/skins`,
        './resources/assets/js/skins'
    );

