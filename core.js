var $ = jQuery.noConflict();

(function ($) {

    'use strict';

    function SMLcore() {

        var self = this;

        self.$body = $("body");

        self.init();
    }

    SMLcore.prototype = {

        init: function () {

            var self = this;

            self.$body.on("click", ".sml-add-link", function( e ){
                self.openMediaWindow();
                e.preventDefault();
            });
        },

        openMediaWindow: function(){

            var self = this;

           if ( self.window === undefined ) {

                self.window = wp.media({
                    title: 'Vytvořit odkaz na soubor',
                    library: {type: 'application'}, // pouze mime types application/xxx
                    multiple: false,
                    button: {text: 'Vytvořit'}
                });

                self.window.on('select', function() {

                    var editor, wpActiveEditor,
                        hasTinymce = ( window.tinymce !== undefined ) ? window.tinymce : false,
                        hasQuicktags = ( window.QTags !== undefined ) ? window.QTags : false;

                    if ( this.activeEditor ) {
                        wpActiveEditor = window.wpActiveEditor = this.activeEditor;
                    } else {
                        wpActiveEditor = window.wpActiveEditor;
                    }

                    if ( ! wpActiveEditor ) {
                        if ( hasTinymce && tinymce.activeEditor ) {
                            editor = tinymce.activeEditor;
                            wpActiveEditor = window.wpActiveEditor = editor.id;
                        } else if ( ! hasQuicktags ) {
                            return false;
                        }
                    } else if ( hasTinymce ) {
                        editor = tinymce.get( wpActiveEditor );
                    }

                    var selection_content, link_title, file;

                    if ( editor && ! editor.isHidden() ) {
                        selection_content = editor.selection.getContent();
                    } else {
                        selection_content = self.getSelectionText( $( '#' + wpActiveEditor ) );
                    }

                    file = self.window.state().get('selection').first().toJSON();

                    // Vlozime odkaz na vybrany soubor
                    // pokud neni vybrany zadny text, tak i s nazvem
                    if( selection_content === "" ){
                        link_title = file.title;
                    } else {
                        link_title = selection_content;
                    }

                    wp.media.editor.insert('<a href="'+ file.url +'">'+ link_title +'</a>');

                });
           }

            self.window.open();
            return false;
        },

        getSelectionText: function( obj ) {

            if ( window.getSelection ) {
                try {
                    var qta = obj.get(0);
                    return qta.value.substring( qta.selectionStart, qta.selectionEnd );
                } catch (e) {
                    console.log('Cant get selection text');
                }
            }
            // For IE
            if (document.selection && document.selection.type !== "Control") {
                return document.selection.createRange().text;
            }

        }

    }

    $(document).ready(function () {
        new SMLcore();
    });

})(jQuery);
