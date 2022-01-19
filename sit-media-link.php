<?php
/**
 * Plugin Name: SIT media link
 * Description: Vyrábí odkaz na media soubor v editoru
 * Version: 1.0.0
 * Author: SIT:Jaroslav Dvořák
 **/

// Cesta k pluginu
if ( !defined('SML_PLUGIN_PATH') ) {
    define( 'SML_PLUGIN_PATH', plugin_dir_url( __FILE__ ) );
}

// Tlaciko "Media" dame pryc
add_action('admin_head', function() {
    //global $current_screen;
    //$post_types = array('news', 'gallery');
    //if (in_array($current_screen->post_type,$post_types)) {
        remove_action('media_buttons', 'media_buttons');
    //}
});

// Vlastni tlacitko nad editor
add_action('media_buttons', function(){
    echo '<a href="#" class="sml-add-link button">Vytvořit odkaz na soubor</a>';

    //$mimes = get_allowed_mime_types();
    //print_r( $mimes );
});

// JS
add_action('wp_enqueue_media', function() {
    wp_enqueue_script('sml_media_button', SML_PLUGIN_PATH . 'core.js', array('jquery'), '1.0', true);
});
