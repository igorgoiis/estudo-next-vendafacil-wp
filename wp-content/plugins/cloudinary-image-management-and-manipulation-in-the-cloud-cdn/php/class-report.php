<?php
/**
 * Cloudinary Report to collect data.
 *
 * @package Cloudinary
 */

namespace Cloudinary;

use Cloudinary\Component\Setup;
use WP_Post;
use WP_Screen;

/**
 * Plugin report class.
 */
class Report extends Settings_Component implements Setup {

	/**
	 * Holds the plugin instance.
	 *
	 * @var Plugin Instance of the global plugin.
	 */
	public $plugin;

	/**
	 * Holds the option key for tracking reports.
	 */
	const REPORT_KEY = '_cloudinary_report';

	/**
	 * Report constructor.
	 *
	 * @param Plugin $plugin Global instance of the main plugin.
	 */
	public function __construct( Plugin $plugin ) {
		parent::__construct( $plugin );
		add_action( 'cloudinary_settings_save_setting_enable_report', array( $this, 'init_reporting' ), 10, 3 );
		add_filter( 'media_row_actions', array( $this, 'add_inline_action' ), 50, 2 );
		add_filter( 'post_row_actions', array( $this, 'add_inline_action' ), 50, 2 );
		add_filter( 'page_row_actions', array( $this, 'add_inline_action' ), 50, 2 );
		add_filter( 'handle_bulk_actions-edit-post', array( $this, 'add_to_report' ), 10, 3 );
		add_filter( 'handle_bulk_actions-upload', array( $this, 'add_to_report' ), 10, 3 );
	}

	/**
	 * Handles bulk actions for adding to report.
	 *
	 * @param string $location The location to redirect after.
	 * @param string $action   The action to handle.
	 * @param array  $post_ids Post ID's to action.
	 *
	 * @return string
	 */
	public function add_to_report( $location, $action, $post_ids ) {
		if ( 'cloudinary-report' === $action ) {
			$items = $this->get_report_items();
			foreach ( $post_ids as $id ) {
				if ( ! in_array( $id, $items, true ) ) {
					$items[] = (int) $id;
				}
			}
			update_option( self::REPORT_KEY, $items, false );
		}

		return $location;
	}

	/**
	 * Add an inline action for adding to report.
	 *
	 * @param array   $actions All actions.
	 * @param WP_Post $post    The current post object.
	 *
	 * @return array
	 */
	public function add_inline_action( $actions, $post ) {

		if ( 'on' === $this->settings->get_value( 'enable_report' ) ) {

			$screen = get_current_screen();

			if ( in_array( $post->ID, $this->get_report_items(), true ) ) {
				$actions['cloudinary-report'] = esc_html__( 'Added to the Cloudinary Report.', 'cloudinary' );
			} else {
				if ( $screen && 'upload' === $screen->id ) {

					$args = array(
						'action'   => 'cloudinary-report',
						'media[]'  => $post->ID,
						'_wpnonce' => wp_create_nonce( 'bulk-media' ),
					);

				} else {
					$args = array(
						'action'   => 'cloudinary-report',
						'post[]'   => $post->ID,
						'_wpnonce' => wp_create_nonce( 'bulk-posts' ),
					);
				}
				$action_url                   = add_query_arg( $args, '' );
				$title                        = esc_html__( 'Add to Cloudinary Report', 'cloudinary' );
				$actions['cloudinary-report'] = sprintf(
					'<a href="%1$s" aria-label="%2$s">%2$s</a>',
					$action_url,
					$title
				);
			}
		}

		return $actions;
	}

	/**
	 * Setup the component.
	 */
	public function setup() {
		if ( 'on' === $this->settings->get_value( 'enable_report' ) ) {
			add_action( 'add_meta_boxes', array( $this, 'image_meta_viewer' ) );
		}
	}

	/**
	 * Init the report by clearing and preparing the report options.
	 *
	 * @param mixed $new_value The new value.
	 *
	 * @return mixed
	 */
	public function init_reporting( $new_value ) {
		delete_option( self::REPORT_KEY );

		return $new_value;
	}

	/**
	 * Add Meta view meta box.
	 */
	public function image_meta_viewer() {
		$screen = get_current_screen();
		if ( ! $screen instanceof WP_Screen || 'attachment' !== $screen->id ) {
			return;
		}

		add_meta_box(
			'meta-viewer',
			__( 'Cloudinary Metadata viewer', 'cloudinary' ),
			array( $this, 'render' )
		);
	}

	/**
	 * Render the metabox content.
	 *
	 * @param WP_Post $post The post.
	 */
	public function render( $post ) {
		if ( 'attachment' === $post->post_type ) {
			$meta = wp_get_attachment_metadata( $post->ID );

			$args = array(
				'type'       => 'tag',
				'element'    => 'pre',
				'attributes' => array(
					'style' => 'overflow:auto;',
				),
				'content'    => wp_json_encode( $meta, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ),
			);
			$this->settings->create_setting( 'meta_viewer', $args )->get_component()->render( true );
		}
	}

	/**
	 * Get the settings structure.
	 *
	 * @return array
	 */
	public function settings() {
		return array(
			'type'       => 'page',
			'menu_title' => __( 'System Report', 'cloudinary' ),
			'tabs'       => array(
				'setup' => array(
					'page_title' => __( 'System Report', 'cloudinary' ),
					array(
						'type'  => 'panel',
						'title' => __( 'System information report', 'cloudinary' ),
						array(
							'title' => __( 'Enable report', 'cloudinary' ),
							'type'  => 'on_off',
							'slug'  => 'enable_report',
						),
						array(
							'type'    => 'tag',
							'element' => 'div',
							'content' => $this->get_report_body(),
							'enabled' => function () {
								$enabled = get_plugin_instance()->settings->get_value( 'enable_report' );
								return 'on' !== $enabled;
							},
						),
						array(
							'type'    => 'system',
							'enabled' => function () {
								$enabled = get_plugin_instance()->settings->get_value( 'enable_report' );
								return 'on' === $enabled;
							},
						),
					),
					array(
						'type' => 'submit',
					),
				),
			),
		);
	}

	/**
	 * Get items ID that are part of the report.
	 *
	 * @return array
	 */
	public function get_report_items() {
		static $items;

		if ( is_null( $items ) ) {
			$items = get_option( self::REPORT_KEY, array() );
		}

		return $items;
	}

	/**
	 * Get the message for disabled report.
	 *
	 * @return string
	 */
	protected function get_report_body() {
		ob_start();
		esc_attr_e( 'Enabling system information reporting will allow you to generate and download a realtime snapshot report. The report will be in JSON format and will include information about:', 'cloudinary' );
		?>
<ul>
	<li><?php esc_html_e( 'Current WordPress and Cloudinary configuration.', 'cloudinary' ); ?></li>
	<li><?php esc_html_e( 'Currently installed plugins.', 'cloudinary' ); ?></li>
	<li><?php esc_html_e( 'Any themes that are being used.', 'cloudinary' ); ?></li>
	<li><?php esc_html_e( 'Any specifically selected media. These can be added to the report from the WordPress Media Library.', 'cloudinary' ); ?></li>
	<li><?php esc_html_e( 'Any specifically selected posts or pages. These can be added to the report from the relevant listing pages.', 'cloudinary' ); ?></li>
</ul>
		<?php
		return ob_get_clean();
	}
}
