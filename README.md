# TinyMCE Field Type for Statamic

Add [TinyMCE v5](https://www.tiny.cloud/features) wysiwyg as a Statamic field type.

## Installation

1. Unzip and move the folder `TinyMceWysiwyg` to your `site/addons/`
2. That's it. You're done.

## Configuration

Essentially all of TinyMCE's configuration options for `tinymce.init()` are supported in the configuration -  [TinyMCE v5 docs](https://www.tiny.cloud/docs/).

**NOTE:** To use additional plugins, they need to be bundled, so you'll have to do more work (see "Adding Plugins and Development").

1. You can customize options using the addon > settings interface or directly editing `site/settings/addons/tiny_mce_wysiwyg.yaml`

## Adding Plugins and Development

You'll need `yarn` installed globally.

1. From the addon folder, run `yarn install`
2. If you need additional TinyMCE plugins, you'll have to:
   * Add `import` statements in `resources/assets/src/tinymce.js` for the plugins you want.
   * Be sure to include them in your settings `plugins` array and toolbar locations as desired.

#### Build commands
* `yarn watch` - Build _(dev)_ and watch
* `yarn build` - Build _(dev)_
* `yarn build:prod` - Build _(production)_
