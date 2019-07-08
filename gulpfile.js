const elixir = require('laravel-elixir');
const mceNodePath = './node_modules/tinymce'

require('laravel-elixir-vue');

elixir(function(mix) {

    // Build js
    mix.webpack([
        './resources/assets/src/tinymce.js'
    ], './resources/assets/js/fieldtype.js');

    // Copy mce skin assets
    mix.copy(`${mceNodePath}/skins`, './resources/assets/js/skins');
});
