<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package docsy
 * @since 1.0.0
 */

/**
 * Enqueue the CSS files.
 *
 * @since 1.0.0
 *
 * @return void
 */
function docsy_styles() {
	wp_enqueue_style(
		'docsy-style',
		get_stylesheet_uri(),
		[],
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'docsy_styles' );

if ( ! function_exists( 'docsy_load_scripts' ) ) {
	/**
	 * Enqueue CSS Stylesheets and Javascript files.
	 *
	 * @return void
	 */
	function docsy_load_scripts() {
		$theme_version = wp_get_theme()->get( 'Version' );
		wp_dequeue_style( 'global-styles' );

		wp_enqueue_style( 'style', get_stylesheet_uri(), array(), $theme_version );
		wp_enqueue_style( 'docsy-global-style', get_template_directory_uri() . '/build/global/style.css', [], null );

		wp_enqueue_style( 'main', get_theme_file_uri( '/assets/css/main.css' ), array(), $theme_version, 'all' ); // main.scss: Compiled custom styles.
		wp_enqueue_script( 'docsy-global-js', get_template_directory_uri() . '/build/global/index.js', [], $theme_version, false );
		// Only use wc_placeholder_img_src if WooCommerce is active
		$placeholder_src = function_exists('wc_placeholder_img_src') ? wc_placeholder_img_src() : '';
		wp_localize_script( 'docsy-global-js', 'swParams', [
			'root'  			=> esc_url_raw(rest_url()),
			'nonce' 			=> wp_create_nonce('wp_rest'),
			'placeholder_src' 	=> $placeholder_src,
		]);
	}
	add_action( 'wp_enqueue_scripts', 'docsy_load_scripts' );
}

function docsy_load_editor_styles() {
	if ( is_admin() ) {
		$theme_version = wp_get_theme()->get( 'Version' );
		wp_enqueue_style( 'editor-style', get_theme_file_uri( 'style-editor.css' ) );
		wp_dequeue_style('global-styles');
		wp_dequeue_style('wp-block-library');
		wp_enqueue_style( 'style', get_stylesheet_uri(), array(), $theme_version );
		wp_enqueue_style(
			'docsy-global-style',
			get_template_directory_uri() . '/build/global/style.css',
			[],
			null
		);
		wp_enqueue_style( 'main', get_theme_file_uri( '/assets/css/main.css' ), array(), $theme_version, 'all' ); // main.scss: Compiled custom styles.
		wp_enqueue_script(
			'docsy-global-js',
			get_template_directory_uri() . '/build/global/index.js',
			[],
			$theme_version,
			true
		);

		if ( is_rtl() ) {
			wp_enqueue_style( 'rtl', get_theme_file_uri( 'build/rtl.css' ), array(), $theme_version, 'all' );
		}

		wp_enqueue_script( 'mainjs', get_theme_file_uri( 'build/main.js' ), array(), $theme_version, true );
	}
}
add_action( 'enqueue_block_assets', 'docsy_load_editor_styles' );
	
function docsy_register_all_blocks() {
    $blocks_dir = get_template_directory() . '/build/';

    foreach (glob($blocks_dir . '*', GLOB_ONLYDIR) as $block_path) {
        $block_json = $block_path . '/block.json';
        if (file_exists($block_json)) {
            register_block_type( $block_path );
        }
    }
}
add_action('init', 'docsy_register_all_blocks');
add_action('init', 'docsy_register_all_blocks');
