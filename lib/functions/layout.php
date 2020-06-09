<?php
/**
 *  Filter the Layout configuration in the child theme.
 *
 * @package    modifiedGenesisSample\Functions
 * @since      1.0.0
 * @author     Robert A. Gadon
 * @link       http://spiralwebdb.com
 * @license    GNU General Public License 2.0+
 */

namespace landyardLandTheme\Functions;

add_filter( 'genesis_initial_layouts', __NAMESPACE__ . '\filter_layout_config' );
/**
 * Filter the layout configuration
 *
 * @param string $config The config file to look for (not including .php file extension).
 *
 * @return array The config data.
 * @since 1.0.0
 *
 */
function filter_layout_config() {
	return genesis_get_config( 'layouts' );
}
 