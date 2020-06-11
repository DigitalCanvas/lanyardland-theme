<?php
/**
 *  The theme settings layouts for the child theme available in the Customizer
 *
 * @package    landyardLandTheme
 * @since      1.0.0
 * @author     Robert A. Gadon
 * @link       http://spiralwebdb.com
 * @license    GNU General Public License 2.0+
 */

namespace landyardLandTheme;

$url = GENESIS_ADMIN_IMAGES_URL . '/layouts/';

/**
 * The themes settings layouts configuratipn for the LanyardLand Theme.
 *
 * @since 1.0.0
 *
 * @return array
 */
return [
	'full-width-content'      => [
		'label' => __( 'Full Width Content', 'genesis-sample' ),
		'img'   => $url . 'c.gif',
		'type'  => [ 'site' ],
	],
];

 