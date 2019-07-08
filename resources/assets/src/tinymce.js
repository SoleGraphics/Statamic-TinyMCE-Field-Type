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
    <div>
        <textarea class="sg_tinymce_instance" v-model="data"></textarea>
    </div>
    `,

    data: function() {
        return {
            editor: null
        };
    },

    beforeDestroy() {
        this.editor.destroy();
    },

    methods: {
        updateContent(content) {
            this.data = content;
        }
    },

    ready() {
        const mceConfig = window.TinyMceWysiwygConfig || {};

        tinymce.init({
            selector: 'textarea.sg_tinymce_instance',
            ...mceConfig,
            init_instance_callback: (editor) => {
                this.editor = editor;

                editor.on('KeyUp', (e) => {
                    this.updateContent(editor.getContent());
                });
                editor.on('Change', (e) => {
                    this.updateContent(editor.getContent());
                });

                // Set content to statamic data model
                editor.setContent(this.data);
            }
        });
    }
});
