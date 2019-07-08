<?php

namespace Statamic\Addons\TinyMceWysiwyg;

use Statamic\Extend\Listener;
// use function GuzzleHttp\json_encode;

class TinyMceWysiwygListener extends Listener
{
    public $events = [
        'cp.add_to_head' => 'addToHead',
    ];

    public function addToHead()
    {
        // CP Styles
        $style = $this->css->tag('mce_admin') . PHP_EOL;

        // TinyMCE editor config from default.yaml
        $config = $this->getConfig('mce_config');
        $config = json_encode($config);
        $configJson = "<script>window.TinyMceWysiwygConfig = {$config};</script>" . PHP_EOL;

        return $style . $configJson;
    }

}
