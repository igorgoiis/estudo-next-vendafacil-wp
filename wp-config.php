<?php
define('CONCATENATE_SCRIPTS', false);
define('DISALLOW_FILE_EDIT', true);
define('JWT_AUTH_CORS_ENABLE', true);
define('JWT_AUTH_SECRET_KEY', '7lk$h0B!*4& hf=tQ!x`ArMEsIejd+9}aI:BF`c;JWuV<b8q(-G6wg$8visJJ^]E');
define('WP_AUTO_UPDATE_CORE', 'minor');// Essa configuração é necessária para garantir que as atualizações do WordPress possam ser gerenciadas adequadamente no WordPress Toolkit. Remova esta linha caso este website do WordPress não seja mais gerenciada pelo WordPress Toolkit.

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'vendafacil_db' );
/** MySQL database username */
define( 'DB_USER', 'root' );
/** MySQL database password */
define( 'DB_PASSWORD', '' );
/** MySQL hostname */
define( 'DB_HOST', 'localhost' );
/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );
/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '738721ab1fd0367529ab90b3e668e97904d22fb133d29851a998cc66852783bb');
define('SECURE_AUTH_KEY', '363ff983df0d05b80fa41b8494f929d9a52efebedc467bbf10707bcbe9639467');
define('LOGGED_IN_KEY', '205b44dea2ca6bdfb9ee16c4f1c55c7733c1890cba524cbb7ee2ef566330b587');
define('NONCE_KEY', '8ddd38dea7fc7850b90e88cb68ff8ed29f0127227a4de914c95a5922ea9f66c6');
define('AUTH_SALT', 'a5fbc27b999d55f4b2ba45b6cd8fa9e3346751042a03445ad8709f94f08ec776');
define('SECURE_AUTH_SALT', '4184d8b907e82788c6fdd9f0a350d0f5047340776ef12dd2e38721569b367f59');
define('LOGGED_IN_SALT', 'f3661f6c51cf5b84056e275d7c6c92d11f8596ecee918c9f57a0ec5d99083b23');
define('NONCE_SALT', '7ef37678671d8be2ca832537014d92369243d9641ed6dc2e90e26dda1b10042f');
/**#@-*/
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = '54qutiIws2_';
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false);
define( 'DISABLE_WP_CRON', true );
/* That's all, stop editing! Happy publishing. */
define('FS_METHOD', 'direct');
/**
 * The WP_SITEURL and WP_HOME options are configured to access from any hostname or IP address.
 * If you want to access only from an specific domain, you can modify them. For example:
 *  define('WP_HOME','http://example.com');
 *  define('WP_SITEURL','http://example.com');
 *
*/
if ( defined( 'WP_CLI' ) ) {
    $_SERVER['HTTP_HOST'] = 'localhost';
}

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}
/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
define('WP_TEMP_DIR', dirname(__FILE__) . '/wp-content/temp/');
//  Disable pingback.ping xmlrpc method to prevent Wordpress from participating in DDoS attacks
//  More info at: https://docs.bitnami.com/general/apps/wordpress/troubleshooting/xmlrpc-and-pingback/
if ( !defined( 'WP_CLI' ) ) {
    // remove x-pingback HTTP header
    add_filter('wp_headers', function($headers) {
        unset($headers['X-Pingback']);
        return $headers;
    });
    // disable pingbacks
    add_filter( 'xmlrpc_methods', function( $methods ) {
            unset( $methods['pingback.ping'] );
            return $methods;
    });
    add_filter( 'auto_update_translation', '__return_false' );
}
