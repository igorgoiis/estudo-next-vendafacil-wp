<?php
/*
Plugin Name: WPC Added To Cart Notification for WooCommerce
Plugin URI: https://wpclever.net/
Description: WPC Added To Cart Notification will open a popup to notify the customer immediately after adding a product to cart.
Version: 1.5.0
Author: WPClever.net
Author URI: https://wpclever.net
Text Domain: wooac
Domain Path: /languages/
Requires at least: 4.0
Tested up to: 5.7
WC requires at least: 3.0
WC tested up to: 5.1
*/

defined( 'ABSPATH' ) || exit;

! defined( 'WOOAC_VERSION' ) && define( 'WOOAC_VERSION', '1.5.0' );
! defined( 'WOOAC_URI' ) && define( 'WOOAC_URI', plugin_dir_url( __FILE__ ) );
! defined( 'WOOAC_SUPPORT' ) && define( 'WOOAC_SUPPORT', 'https://wpclever.net/support?utm_source=support&utm_medium=wooac&utm_campaign=wporg' );
! defined( 'WOOAC_REVIEWS' ) && define( 'WOOAC_REVIEWS', 'https://wordpress.org/support/plugin/woo-added-to-cart-notification/reviews/?filter=5' );
! defined( 'WOOAC_CHANGELOG' ) && define( 'WOOAC_CHANGELOG', 'https://wordpress.org/plugins/woo-added-to-cart-notification/#developers' );
! defined( 'WOOAC_DISCUSSION' ) && define( 'WOOAC_DISCUSSION', 'https://wordpress.org/support/plugin/woo-added-to-cart-notification' );
! defined( 'WPC_URI' ) && define( 'WPC_URI', WOOAC_URI );

include 'includes/wpc-dashboard.php';
include 'includes/wpc-menu.php';
include 'includes/wpc-kit.php';

if ( ! function_exists( 'wooac_init' ) ) {
	add_action( 'plugins_loaded', 'wooac_init', 11 );

	function wooac_init() {
		// load text-domain
		load_plugin_textdomain( 'wooac', false, basename( __DIR__ ) . '/languages/' );

		if ( ! function_exists( 'WC' ) || ! version_compare( WC()->version, '3.0', '>=' ) ) {
			add_action( 'admin_notices', 'wooac_notice_wc' );

			return;
		}

		if ( ! class_exists( 'WPCleverWooac' ) && class_exists( 'WC_Product' ) ) {
			class WPCleverWooac {
				function __construct() {
					// menu
					add_action( 'admin_menu', array( $this, 'wooac_admin_menu' ) );

					// frontend scripts
					add_action( 'wp_enqueue_scripts', array( $this, 'wooac_enqueue_scripts' ) );

					// link
					add_filter( 'plugin_action_links', array( $this, 'wooac_action_links' ), 10, 2 );
					add_filter( 'plugin_row_meta', array( $this, 'wooac_row_meta' ), 10, 2 );

					// add the time
					add_action( 'woocommerce_add_to_cart', array( $this, 'wooac_add_to_cart' ), 10 );

					// fragments
					add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'wooac_cart_fragment' ) );

					// footer
					add_action( 'wp_footer', array( $this, 'wooac_footer' ) );
				}

				function wooac_admin_menu() {
					add_submenu_page( 'wpclever', esc_html__( 'WPC Added To Cart Notification', 'wooac' ), esc_html__( 'Added To Cart Notification', 'wooac' ), 'manage_options', 'wpclever-wooac', array(
						&$this,
						'wooac_admin_menu_content'
					) );
				}

				function wooac_admin_menu_content() {
					$active_tab = isset( $_GET['tab'] ) ? $_GET['tab'] : 'settings';
					?>
                    <div class="wpclever_settings_page wrap">
                        <h1 class="wpclever_settings_page_title"><?php echo esc_html__( 'WPC Added To Cart Notification', 'wooac' ) . ' ' . WOOAC_VERSION; ?></h1>
                        <div class="wpclever_settings_page_desc about-text">
                            <p>
								<?php printf( esc_html__( 'Thank you for using our plugin! If you are satisfied, please reward it a full five-star %s rating.', 'wooac' ), '<span style="color:#ffb900">&#9733;&#9733;&#9733;&#9733;&#9733;</span>' ); ?>
                                <br/>
                                <a href="<?php echo esc_url( WOOAC_REVIEWS ); ?>"
                                   target="_blank"><?php esc_html_e( 'Reviews', 'wooac' ); ?></a> | <a
                                        href="<?php echo esc_url( WOOAC_CHANGELOG ); ?>"
                                        target="_blank"><?php esc_html_e( 'Changelog', 'wooac' ); ?></a>
                                | <a href="<?php echo esc_url( WOOAC_DISCUSSION ); ?>"
                                     target="_blank"><?php esc_html_e( 'Discussion', 'wooac' ); ?></a>
                            </p>
                        </div>
                        <div class="wpclever_settings_page_nav">
                            <h2 class="nav-tab-wrapper">
                                <a href="<?php echo admin_url( 'admin.php?page=wpclever-wooac&tab=settings' ); ?>"
                                   class="<?php echo $active_tab === 'settings' ? 'nav-tab nav-tab-active' : 'nav-tab'; ?>">
									<?php esc_html_e( 'Settings', 'wooac' ); ?>
                                </a>
                                <a href="<?php echo admin_url( 'admin.php?page=wpclever-wooac&tab=premium' ); ?>"
                                   class="<?php echo $active_tab === 'premium' ? 'nav-tab nav-tab-active' : 'nav-tab'; ?>"
                                   style="color: #c9356e">
									<?php esc_html_e( 'Premium Version', 'wooac' ); ?>
                                </a>
                                <a href="<?php echo esc_url( admin_url( 'admin.php?page=wpclever-kit' ) ); ?>"
                                   class="nav-tab">
									<?php esc_html_e( 'Essential Kit', 'wooac' ); ?>
                                </a>
                            </h2>
                        </div>
                        <div class="wpclever_settings_page_content">
							<?php if ( $active_tab === 'settings' ) {
								$wooac_effect                 = get_option( 'wooac_effect', 'mfp-3d-unfold' );
								$wooac_show_image             = get_option( 'wooac_show_image', 'yes' );
								$wooac_show_content           = get_option( 'wooac_show_content', 'yes' );
								$wooac_show_view_cart         = get_option( 'wooac_show_view_cart', 'yes' );
								$wooac_show_continue_shopping = get_option( 'wooac_show_continue_shopping', 'yes' );
								$wooac_continue_url           = get_option( 'wooac_continue_url', '' );
								$wooac_add_link               = get_option( 'wooac_add_link', 'yes' );
								$wooac_auto_close             = get_option( 'wooac_auto_close', '2000' );
								?>
                                <form method="post" action="options.php">
									<?php wp_nonce_field( 'update-options' ) ?>
                                    <table class="form-table">
                                        <tr class="heading">
                                            <th colspan="2">
												<?php esc_html_e( 'General', 'wooac' ); ?>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="row"><?php esc_html_e( 'Popup effect', 'wooac' ); ?></th>
                                            <td>
                                                <select name="wooac_effect">
                                                    <option
                                                            value="mfp-fade" <?php echo esc_attr( $wooac_effect === 'mfp-fade' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Fade', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="mfp-zoom-in" <?php echo esc_attr( $wooac_effect === 'mfp-zoom-in' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Zoom in', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="mfp-zoom-out" <?php echo esc_attr( $wooac_effect === 'mfp-zoom-out' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Zoom out', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="mfp-newspaper" <?php echo esc_attr( $wooac_effect === 'mfp-newspaper' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Newspaper', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="mfp-move-horizontal" <?php echo esc_attr( $wooac_effect === 'mfp-move-horizontal' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Move horizontal', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="mfp-move-from-top" <?php echo esc_attr( $wooac_effect === 'mfp-move-from-top' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Move from top', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="mfp-3d-unfold" <?php echo esc_attr( $wooac_effect === 'mfp-3d-unfold' ? 'selected' : '' ); ?>>
														<?php esc_html_e( '3d unfold', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="mfp-slide-bottom" <?php echo esc_attr( $wooac_effect === 'mfp-slide-bottom' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Slide bottom', 'wooac' ); ?>
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><?php esc_html_e( 'Show image', 'wooac' ); ?></th>
                                            <td>
                                                <select name="wooac_show_image">
                                                    <option
                                                            value="yes" <?php echo esc_attr( $wooac_show_image === 'yes' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Yes', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="no" <?php echo esc_attr( $wooac_show_image === 'no' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'No', 'wooac' ); ?>
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><?php esc_html_e( 'Show cart content', 'wooac' ); ?></th>
                                            <td>
                                                <select name="wooac_show_content">
                                                    <option
                                                            value="yes" <?php echo esc_attr( $wooac_show_content === 'yes' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Yes', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="no" <?php echo esc_attr( $wooac_show_content === 'no' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'No', 'wooac' ); ?>
                                                    </option>
                                                </select> <span
                                                        class="description"><?php esc_html_e( 'Show/hide the cart total and cart content count.', 'wooac' ); ?></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><?php esc_html_e( 'Show "View Cart" button', 'wooac' ); ?></th>
                                            <td>
                                                <select name="wooac_show_view_cart">
                                                    <option
                                                            value="yes" <?php echo esc_attr( $wooac_show_view_cart === 'yes' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Yes', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="no" <?php echo esc_attr( $wooac_show_view_cart === 'no' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'No', 'wooac' ); ?>
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><?php esc_html_e( 'Show "Continue Shopping" button', 'wooac' ); ?></th>
                                            <td>
                                                <select name="wooac_show_continue_shopping">
                                                    <option
                                                            value="yes" <?php echo esc_attr( $wooac_show_continue_shopping === 'yes' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Yes', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="no" <?php echo esc_attr( $wooac_show_continue_shopping === 'no' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'No', 'wooac' ); ?>
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><?php esc_html_e( 'Continue shopping link', 'wooac' ); ?></th>
                                            <td>
                                                <input type="url" name="wooac_continue_url"
                                                       value="<?php echo esc_url( $wooac_continue_url ); ?>"
                                                       class="regular-text code"/> <span
                                                        class="description">
											<?php esc_html_e( 'By default, only hide the popup when clicking on "Continue Shopping" button.', 'wooac' ); ?>
										</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><?php esc_html_e( 'Add link to product name', 'wooac' ); ?></th>
                                            <td>
                                                <select name="wooac_add_link">
                                                    <option
                                                            value="yes" <?php echo esc_attr( $wooac_add_link === 'yes' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'Yes', 'wooac' ); ?>
                                                    </option>
                                                    <option
                                                            value="no" <?php echo esc_attr( $wooac_add_link === 'no' ? 'selected' : '' ); ?>>
														<?php esc_html_e( 'No', 'wooac' ); ?>
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><?php esc_html_e( 'Auto close', 'wooac' ); ?></th>
                                            <td>
                                                <input name="wooac_auto_close" type="number" min="0" max="300000"
                                                       step="1"
                                                       value="<?php echo esc_attr( $wooac_auto_close ); ?>"/>ms.
                                                <span class="description">
											<?php esc_html_e( 'Set the time is zero to disable auto close.', 'wooac' ); ?>
										</span>
                                                <p style="color: #c9356e">
                                                    This feature is only available on the Premium Version. Click <a
                                                            href="https://wpclever.net/downloads/woocommerce-added-to-cart-notification?utm_source=pro&utm_medium=wooac&utm_campaign=wporg"
                                                            target="_blank">here</a> to buy, just $19.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr class="submit">
                                            <th colspan="2">
                                                <input type="submit" name="submit" class="button button-primary"
                                                       value="<?php esc_attr_e( 'Update Options', 'wooac' ); ?>"/>
                                                <input type="hidden" name="action" value="update"/>
                                                <input type="hidden" name="page_options"
                                                       value="wooac_effect,wooac_show_image,wooac_show_content,wooac_show_view_cart,wooac_show_continue_shopping,wooac_continue_url,wooac_add_link,wooac_auto_close"/>
                                            </th>
                                        </tr>
                                    </table>
                                </form>
							<?php } elseif ( $active_tab === 'premium' ) { ?>
                                <div class="wpclever_settings_page_content_text">
                                    <p>
                                        Get the Premium Version just $19! <a
                                                href="https://wpclever.net/downloads/woocommerce-added-to-cart-notification?utm_source=pro&utm_medium=wooac&utm_campaign=wporg"
                                                target="_blank">https://wpclever.net/downloads/woocommerce-added-to-cart-notification</a>
                                    </p>
                                    <p><strong>Extra features for Premium Version:</strong></p>
                                    <ul style="margin-bottom: 0">
                                        <li>- Add the time to auto close popup.</li>
                                        <li>- Get the lifetime update & premium support.</li>
                                    </ul>
                                </div>
							<?php } ?>
                        </div>
                    </div>
					<?php
				}

				function wooac_enqueue_scripts() {
					// feather icons
					wp_enqueue_style( 'wooac-feather', WOOAC_URI . 'assets/libs/feather/feather.css' );

					// magnific
					wp_enqueue_style( 'magnific-popup', WOOAC_URI . 'assets/libs/magnific-popup/magnific-popup.css' );
					wp_enqueue_script( 'magnific-popup', WOOAC_URI . 'assets/libs/magnific-popup/jquery.magnific-popup.min.js', array( 'jquery' ), WOOAC_VERSION, true );

					// main style & js
					wp_enqueue_style( 'wooac-frontend', WOOAC_URI . 'assets/css/frontend.css' );
					wp_enqueue_script( 'wooac-frontend', WOOAC_URI . 'assets/js/frontend.js', array( 'jquery' ), WOOAC_VERSION, true );
					wp_localize_script( 'wooac-frontend', 'wooac_vars', array(
							'ajax_url' => admin_url( 'admin-ajax.php' ),
							'effect'   => get_option( 'wooac_effect', 'mfp-3d-unfold' ),
							'close'    => (int) get_option( 'wooac_auto_close', '2000' ),
							'delay'    => (int) apply_filters( 'wooac_delay', 300 ),
							'nonce'    => wp_create_nonce( 'wooac-nonce' )
						)
					);
				}

				function wooac_action_links( $links, $file ) {
					static $plugin;

					if ( ! isset( $plugin ) ) {
						$plugin = plugin_basename( __FILE__ );
					}

					if ( $plugin === $file ) {
						$settings         = '<a href="' . admin_url( 'admin.php?page=wpclever-wooac&tab=settings' ) . '">' . esc_html__( 'Settings', 'wooac' ) . '</a>';
						$links['premium'] = '<a href="' . admin_url( 'admin.php?page=wpclever-wooac&tab=premium' ) . '">' . esc_html__( 'Premium Version', 'wooac' ) . '</a>';
						array_unshift( $links, $settings );
					}

					return $links;
				}

				function wooac_row_meta( $links, $file ) {
					static $plugin;

					if ( ! isset( $plugin ) ) {
						$plugin = plugin_basename( __FILE__ );
					}

					if ( $plugin === $file ) {
						$row_meta = array(
							'support' => '<a href="' . esc_url( WOOAC_SUPPORT ) . '" target="_blank">' . esc_html__( 'Support', 'wooac' ) . '</a>',
						);

						return array_merge( $links, $row_meta );
					}

					return (array) $links;
				}

				function wooac_get_product() {
					$items       = WC()->cart->get_cart();
					$return_html = '<div class="wooac-popup mfp-with-anim">';

					$return_html .= apply_filters( 'wooac_before', '' );

					if ( count( $items ) > 0 ) {
						foreach ( $items as $key => $item ) {
							if ( ! isset( $item['wooac_time'] ) ) {
								$items[ $key ]['wooac_time'] = time() - 10000;
							}
						}

						array_multisort( array_column( $items, 'wooac_time' ), SORT_ASC, $items );
						$wooac_product = end( $items )['data'];

						if ( ! in_array( $wooac_product->get_id(), apply_filters( 'wooac_exclude_ids', array( 0 ) ), true ) ) {
							if ( get_option( 'wooac_show_image', 'yes' ) === 'yes' ) {
								$return_html .= apply_filters( 'wooac_image', '<div class="wooac-image">' . $wooac_product->get_image() . '</div>', $wooac_product );
							}

							$return_html .= apply_filters( 'wooac_image_after', '' );

							if ( get_option( 'wooac_add_link', 'yes' ) === 'yes' ) {
								$return_html .= apply_filters( 'wooac_text', '<div class="wooac-text">' . sprintf( esc_html__( '%s was added to the cart.', 'wooac' ), '<a href="' . $wooac_product->get_permalink() . '">' . $wooac_product->get_name() . '</a>' ) . '</div>', $wooac_product );
							} else {
								$return_html .= apply_filters( 'wooac_text', '<div class="wooac-text">' . sprintf( esc_html__( '%s was added to the cart.', 'wooac' ), '<span>' . $wooac_product->get_name() . '</span>' ) . '</div>', $wooac_product );
							}

							$return_html .= apply_filters( 'wooac_text_after', '' );

							if ( get_option( 'wooac_show_content', 'yes' ) === 'yes' ) {
								$cart_content_data = '<span class="wooac-cart-content-total">' . wp_kses_post( WC()->cart->get_cart_subtotal() ) . '</span> <span class="wooac-cart-content-count">' . wp_kses_data( sprintf( _n( '%d item', '%d items', WC()->cart->get_cart_contents_count(), 'wooac' ), WC()->cart->get_cart_contents_count() ) ) . '</span>';
								$cart_content      = sprintf( esc_html__( 'Your cart: %s', 'wooac' ), $cart_content_data );
								$return_html       .= apply_filters( 'wooac_cart_content', '<div class="wooac-cart-content">' . $cart_content . '</div>' );
							}

							$return_html .= apply_filters( 'wooac_cart_content_after', '' );

							if ( ( get_option( 'wooac_show_view_cart', 'yes' ) === 'yes' ) || ( get_option( 'wooac_show_continue_shopping', 'yes' ) === 'yes' ) ) {
								$return_html .= '<div class="wooac-action">';

								if ( get_option( 'wooac_show_view_cart', 'yes' ) === 'yes' ) {
									$return_html .= apply_filters( 'wooac_cart', '<a id="wooac-cart" href="' . wc_get_cart_url() . '">' . esc_html__( 'View Cart', 'wooac' ) . '</a>' );
								}

								if ( get_option( 'wooac_show_continue_shopping', 'yes' ) === 'yes' ) {
									$return_html .= apply_filters( 'wooac_continue', '<a id="wooac-continue" href="#" data-url="' . get_option( 'wooac_continue_url' ) . '">' . esc_html__( 'Continue Shopping', 'wooac' ) . '</a>' );
								}

								$return_html .= '</div>';
							}

							$return_html .= apply_filters( 'wooac_action_after', '' );
						}
					}

					$return_html .= apply_filters( 'wooac_after', '' );

					$return_html .= '</div>';

					return $return_html;
				}

				function wooac_add_to_cart( $cart_item_key ) {
					if ( isset( WC()->cart->cart_contents[ $cart_item_key ]['woosb_parent_id'] ) || isset( WC()->cart->cart_contents[ $cart_item_key ]['wooco_parent_id'] ) || isset( WC()->cart->cart_contents[ $cart_item_key ]['woobt_parent_id'] ) || isset( WC()->cart->cart_contents[ $cart_item_key ]['woofs_parent_id'] ) ) {
						// prevent bundled products and composite products
						WC()->cart->cart_contents[ $cart_item_key ]['wooac_time'] = time() - 10000;
					} else {
						WC()->cart->cart_contents[ $cart_item_key ]['wooac_time'] = time();
					}
				}

				function wooac_cart_fragment( $fragments ) {
					$fragments['.wooac-popup'] = $this->wooac_get_product();

					return $fragments;
				}

				function wooac_footer() {
					echo '<div class="wooac-popup mfp-with-anim"></div>';

					if ( isset( $_POST['add-to-cart'] ) || isset( $_GET['add-to-cart'] ) ) {
						?>
                        <script>
                          jQuery(document).ready(function() {
                            jQuery('body').on('wc_fragments_refreshed', function() {
                              wooac_show();
                            });
                          });
                        </script>
						<?php
					}
				}
			}

			new WPCleverWooac();
		}
	}
} else {
	add_action( 'admin_notices', 'wooac_notice_premium' );
}

if ( ! function_exists( 'wooac_notice_wc' ) ) {
	function wooac_notice_wc() {
		?>
        <div class="error">
            <p><strong>WPC Added To Cart Notification</strong> requires WooCommerce version 3.0 or greater.</p>
        </div>
		<?php
	}
}

if ( ! function_exists( 'wooac_notice_premium' ) ) {
	function wooac_notice_premium() {
		?>
        <div class="error">
            <p>Seems you're using both free and premium version of <strong>WPC Added To Cart Notification</strong>.
                Please deactivate the free version when using the premium version.</p>
        </div>
		<?php
	}
}