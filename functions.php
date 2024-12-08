<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function dahlia_theme_setup() {
    // Soporte para theme.json
    add_theme_support( 'block-templates' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

    add_editor_style( 'build/styles.css' );
}
add_action( 'after_setup_theme', 'dahlia_theme_setup' );

function dahlia_enqueue_assets() {
    $theme_version = wp_get_theme()->get( 'Version' );

    // Estilos del tema
    wp_enqueue_style( 
        'dahlia-styles', 
        get_template_directory_uri() . '/build/style.css', 
        array( 'wp-block-library' ), // Dependency on core block styles
        $theme_version );

    // Scripts del tema
    wp_enqueue_script( 
        'dahlia-scripts', 
        get_template_directory_uri() . '/build/main.js', array(),
         $theme_version, 
         true );
}
add_action( 'wp_enqueue_scripts', 'dahlia_enqueue_assets' );

function dahlia_enqueue_google_fonts() {
    wp_enqueue_style(
        'dahlia-google-fonts',
        'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Lexend:wght@400;700&display=swap',
        array(),
        null
    );
}
add_action( 'wp_enqueue_scripts', 'dahlia_enqueue_google_fonts' );