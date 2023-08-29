<?php
/*
Plugin Name: WooCommerce Confetti
Description: Add confetti animation on WooCommerce order confirmation page.
Version: 1.0
Author: Peter Moers
*/

// Enqueue JavaScript only on WooCommerce order-confirmed page
add_action('wp_enqueue_scripts', 'confetti_enqueue_scripts');

function confetti_enqueue_scripts() {
    if (is_order_received_page()) {
        wp_enqueue_script('confetti-script', plugin_dir_url(__FILE__) . 'confetti.js', array(), '1.0', true);
    }
}

?>
