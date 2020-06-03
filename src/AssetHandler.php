<?php
/**
 * Asset Handler Class.
 *
 * @package DigitalCanvas\LanyardLand
 * @author  Digital Canvas, LLC.
 * @since   ver 1.0.0
 */

namespace DigitalCanvas\LanyardLand;

class AssetHandler {
	/**
	 * Initialize assets.
	 *
	 * @return void
	 * @since  ver 1.0.0
	 *
	 * @author Digital Canvas, LLC.
	 */
	public function init() {
		add_action( 'wp_enqueue_scripts', [ $this, 'loadStyles' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'loadScripts' ] );
	}

	/**
	 * Load theme styles.
	 *
	 * @return void
	 * @since  ver 1.0.0
	 *
	 * @author Digital Canvas, LLC.
	 */
	public function loadStyles() {
		$appearance = genesis_get_config( 'appearance' );
		$minimized  = $this->is_production() ? '.min' : '';

		wp_deregister_style( genesis_get_theme_handle() );

		wp_enqueue_style( 'dashicons' );

		wp_enqueue_style(
			'dcllc-fonts',
			$appearance['fonts-url'],
			[],
			genesis_get_theme_version()
		);

		wp_enqueue_style(
			genesis_get_theme_handle(),
			get_stylesheet_directory_uri() . "/css/style{$minimized}.css",
			[ 'dashicons', 'dcllc-fonts' ],
			genesis_get_theme_version()
		);

		wp_enqueue_style(
			'slick-css',
			'//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css'
		);

		if ( genesis_is_amp() ) {
			wp_enqueue_style(
				genesis_get_theme_handle() . '-amp',
				get_stylesheet_directory_uri() . '/lib/amp/amp.css',
				[ genesis_get_theme_handle() ],
				genesis_get_theme_version()
			);
		}
	}

	/**
	 * Load theme scripts.
	 *
	 * @return void
	 * @since  ver 1.0.0
	 *
	 * @author Digital Canvas, LLC.
	 */
	public function loadScripts() {
		wp_register_script(
			'slick-slider',
			'//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
			[ 'jquery' ],
			genesis_get_theme_version(),
			true
		);
	}

	/**
	 * Check for installed in production.
	 *
	 * @return bool
	 * @since  ver 1.0.0
	 *
	 * @author Digital Canvas, LLC.
	 */
	private function is_production() {
		return ! ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG === true );
	}
}
