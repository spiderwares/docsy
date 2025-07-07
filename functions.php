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
		
		// Ensure jQuery is loaded for contact form
		wp_enqueue_script( 'jquery' );
		
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

function custom_theme_register_menus() {
    register_nav_menus([
        'main_menu' => __('Main Menu', 'docsy'),
        'header_menu' => __('Header Menu', 'docsy'),
    ]);
}
add_action('after_setup_theme', 'custom_theme_register_menus');
/**
 * Get menu items by menu name
 */
function docsy_get_menu_items_by_name($menu_name) {
    $menu = wp_get_nav_menu_object($menu_name);
    if (!$menu) {
        return [];
    }
    
    $menu_items = wp_get_nav_menu_items($menu->term_id);
    if (!$menu_items) {
        return [];
    }
    
    return $menu_items;
}

/**
 * Render dynamic menu for header block
 */
function docsy_render_header_menu($menu_id) {
    if (!$menu_id) {
        return '';
    }
    
    $menu_items = wp_get_nav_menu_items($menu_id);
    if (!$menu_items) {
        return '';
    }
    
    $output = '';
    foreach ($menu_items as $item) {
        $output .= sprintf(
            '<a href="%s" class="nav-link">%s</a>',
            esc_url($item->url),
            esc_html($item->title)
        );
    }
    
    return $output;
}

/**
 * Render dynamic content for header block
 */
function docsy_render_header_block_content($block_content, $block) {
    if ($block['blockName'] !== 'docsy/header') {
        return $block_content;
    }
    
    $menu_html = '';
    $debug_info = '';
    
    // Extract menu ID from the block content
    if (preg_match('/data-menu-id="(\d+)"/', $block_content, $matches)) {
        $menu_id = intval($matches[1]);
        $debug_info .= "Found menu ID: $menu_id\n";
        
        if ($menu_id > 0) {
            $menu_html = docsy_render_header_menu($menu_id);
            $debug_info .= "Menu HTML length: " . strlen($menu_html) . "\n";
        }
    }
    
    // If no menu found by ID, try to find by name
    if (empty($menu_html) && preg_match('/data-menu-name="([^"]+)"/', $block_content, $matches)) {
        $menu_name = $matches[1];
        $debug_info .= "Trying menu name: $menu_name\n";
        
        $menu_items = docsy_get_menu_items_by_name($menu_name);
        if (!empty($menu_items)) {
            foreach ($menu_items as $item) {
                $menu_html .= sprintf(
                    '<a href="%s" class="nav-link">%s</a>',
                    esc_url($item->url),
                    esc_html($item->title)
                );
            }
            $debug_info .= "Found " . count($menu_items) . " menu items by name\n";
        } else {
            $debug_info .= "No menu items found by name\n";
        }
    }
    
    // Debug output (only for administrators)
    if (current_user_can('manage_options') && !empty($debug_info)) {
        error_log("Header Block Debug: " . $debug_info);
    }
    
    // Replace the dynamic-menu-container with actual menu items
    if ($menu_html) {
        $block_content = preg_replace(
            '/<div class="dynamic-menu-container"[^>]*>.*?<\/div>/s',
            $menu_html,
            $block_content
        );
    }
    
    return $block_content;
}
add_filter('render_block', 'docsy_render_header_block_content', 10, 2);

function add_active_class_to_nav_menu($classes, $item) {
    if (in_array('current-menu-item', $classes) || 
        in_array('current_page_item', $classes) || 
        in_array('current-menu-ancestor', $classes) || 
        in_array('current_page_parent', $classes)) {
        
        $classes[] = 'active'; // Add your custom active class
    }
    return $classes;
}
add_filter('nav_menu_css_class', 'add_active_class_to_nav_menu', 10, 2);
