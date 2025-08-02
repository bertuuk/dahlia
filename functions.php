<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function dahlia_theme_setup() {
    // Soporte para theme.json
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
    // Estilos del tema
    wp_enqueue_style( 
        'dahlia-styles-main', 
        get_template_directory_uri() . '/build/main.css', 
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

function dahlia_enqueue_admin_assets() {
    $theme_version = wp_get_theme()->get( 'Version' );
    // Scripts del tema
    wp_enqueue_script( 
        'dahlia-scripts-editor', 
        get_template_directory_uri() . '/build/admin.js', 
        array(),
         $theme_version, 
         true );
    
}
add_action( 'admin_enqueue_scripts', 'dahlia_enqueue_admin_assets' );

// Enqueue block styles for the theme
function dahlia_enqueue_separator_styles() {
    // Load styles for the frontend
    wp_enqueue_style(
        'dahlia-block-styles',
        get_template_directory_uri() . '/build/blocks.css',
        array(),
        wp_get_theme()->get('Version')
    );

    // Load styles for the editor
    add_editor_style('build/blocks.css');
    // Load styles for the editor
    add_editor_style('build/editor.css');
}
add_action('enqueue_block_editor_assets', 'dahlia_enqueue_separator_styles');
add_action('wp_enqueue_scripts', 'dahlia_enqueue_separator_styles');

function dahlia_enqueue_google_fonts() {
    $google_fonts_url = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lexend:wght@100..900&display=swap';
    wp_enqueue_style(
        'dahlia-google-fonts',
        $google_fonts_url,
        array(),
        null
    );
    // Enqueue for block editor
    add_editor_style( $google_fonts_url );
}
add_action('enqueue_block_editor_assets', 'dahlia_enqueue_google_fonts');
add_action('wp_enqueue_scripts', 'dahlia_enqueue_google_fonts');

// Register a custom style for the separator block
function dahlia_register_block_styles() {
    // Register the new style
    register_block_style(
        'core/separator',
        array(
            'name'      => 'towering', // Internal name for the style
            'label'     => __('Towering', 'dahlia'), // Translatable label
            'isDefault' => true // Set this style as the default
        )
    );
    register_block_style(
        'core/post-terms',
        array(
            'name'  => 'medium-chips', // Internal name for the style
            'label' => __('Medium Chips', 'dahlia') // Translatable label
        )
    );
    register_block_style(
        'core/button',
        array(
            'name'  => 'link', // Internal name for the style
            'label' => __('Link', 'dahlia') // Translatable label
        )
    );
    register_block_style(
        'core/heading',
        array(
            'name'      => 'secondary', // Internal name for the style
            'label'     => __('Secondary', 'dahlia'), // Translatable label
        )
    );
}
add_action('init', 'dahlia_register_block_styles');

/**
 * Shortcode callback for displaying user profile data.
 *
 * This function renders the current user's information (name, email, and username).
 * If the user is not logged in, it shows a login link instead.
 *
 * @return string HTML output of the user profile data or login prompt.
 */
function render_user_profile_data() {
    // If the user is not logged in, display a login link.
    if ( ! is_user_logged_in() ) {
        return '<p>Please <a href="' . esc_url( wp_login_url() ) . '">log in</a> to view your profile.</p>';
    }

    // Get the current user's information.
    $user = wp_get_current_user();

    // Start output buffering to capture the HTML.
    ob_start();
    ?>
    <div class="user-info">
        <p><strong>Name:</strong> <?php echo esc_html( $user->display_name ); ?></p>
        <p><strong>Email:</strong> <?php echo esc_html( $user->user_email ); ?></p>
        <p><strong>Username:</strong> <?php echo esc_html( $user->user_login ); ?></p>
    </div>
    <?php

    // Return the buffered HTML as a string.
    return ob_get_clean();
}
add_shortcode( 'user_profile_data', 'render_user_profile_data' );

/**
 * Shortcode callback for displaying the user's favorite stories.
 *
 * This function fetches and displays a list of posts marked as favorites
 * by the current user. If no favorites are found, it displays a message
 * indicating the absence of favorite stories.
 *
 * @return string HTML output of the user's favorite stories or an empty message.
 */
function render_user_favorite_stories() {
    // If the user is not logged in, return an empty string.
    if ( ! is_user_logged_in() ) {
        return '';
    }

    // Get the current user's ID and their favorite posts.
    $user_id = get_current_user_id();
    $favorites = get_user_favorites( $user_id );

    // If there are no favorites, display a message.
    if ( empty( $favorites ) ) {
        return '<p>You have not marked any stories as favorites.</p>';
    }

    // Start output buffering to capture the HTML.
    ob_start();
    ?>
    <ul class="favorite-stories">
        <?php foreach ( $favorites as $post_id ) : ?>
            <li>
                <a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>">
                    <?php echo esc_html( get_the_title( $post_id ) ); ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
    <?php

    // Return the buffered HTML as a string.
    return ob_get_clean();
}
add_shortcode( 'user_favorite_stories', 'render_user_favorite_stories' );

/**
 * Registers a custom block pattern category named 'Dahlia Patterns'.
 *
 * This function adds a new block pattern category for organizing custom
 * patterns specific to the Dahlia theme.
 *
 * @return void
 */
add_action( 'init', function() {
    register_block_pattern_category(
        'dahlia-patterns',
        array( 'label' => __( 'Dahlia Patterns', 'dahlia' ) )
    );
});