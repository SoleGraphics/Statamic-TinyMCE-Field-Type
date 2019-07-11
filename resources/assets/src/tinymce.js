// TinyMCE Core
import tinymce from 'tinymce/tinymce';

// TinyMCE Theme
import 'tinymce/themes/silver';

// TinyMCE Plugins
import 'tinymce/plugins/code';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/table';

// Our component
Vue.component('tiny_mce_wysiwyg-fieldtype', {
    mixins: [Fieldtype],

    template: `
    <div v-el:tinycontainer>
        <textarea v-el:tinymce class="sg_tinymce_instance" v-model="data"></textarea>
    </div>
    `,

    data: function() {
        return {
            editor: null
        };
    },

    beforeDestroy() {
        this.destroyMCE();
    },

    methods: {
        updateContent(content) {
            this.data = content;
        },

        initMCE() {
            const mceConfig = window.TinyMceWysiwygConfig || {};

            tinymce.init({
                target: this.$els.tinymce,
                convert_urls: false,
                ...mceConfig,
                init_instance_callback: (editor) => {
                    this.editor = editor;
                    
                    /*
                        This fixes a bug where dragging a set with the TinyMCE
                        editor in it but not dropping it in a new location
                        causes the contents of the TinyMCE iframe to break,
                        making the editor unresponsive.

                        Basically manually check every dom manipulation to see
                        if the iframe was in it and if it was, reinitialize
                        TinyMCE.

                        It's not ideal, but it works...
                    */
                    const observer = new MutationObserver(mutations => {
                        const container = this.$els.tinycontainer;
                        const iframe = container.querySelector('iframe');
                        let done = false;

                        for (const mutation of mutations) {
                            for (const node of mutation.addedNodes) {
                                if (node.contains(iframe)) {
                                    this.destroyMCE();
                                    observer.disconnect();
                                    this.initMCE();
                                    
                                    done = true;
                                    break;
                                }
                            }

                            if (done) break;
                        }
                    });

                    observer.observe(document.documentElement, {
                        childList: true,
                        subtree: true
                    });

                    editor.on('KeyUp', (e) => {
                        this.updateContent(editor.getContent());
                    });
                    editor.on('Change', (e) => {
                        this.updateContent(editor.getContent());
                    });

                    // Set content to statamic data model
                    editor.setContent(this.data || '');
                }
            });
        },

        destroyMCE() {
            this.editor.destroy();
        }
    },

    ready() {
        this.initMCE();
    }
});
