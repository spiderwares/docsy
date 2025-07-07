/**
 * Frontend JavaScript for the Contact Form block.
 * This script processes Contact Form 7 shortcodes on the frontend.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all contact form blocks
    const contactFormBlocks = document.querySelectorAll('.contact-form-section .contact-form-content');
    
    contactFormBlocks.forEach(function(block) {
        const shortcode = block.innerHTML.trim();
        
        // Only process if it looks like a Contact Form 7 shortcode
        if (shortcode.includes('[contact-form-7')) {
            // Make AJAX request to WordPress to render the shortcode
            fetch(docsy_ajax.ajaxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'render_contact_form_shortcode',
                    shortcode: shortcode,
                    nonce: docsy_ajax.nonce
                })
            })
            .then(response => response.text())
            .then(html => {
                block.innerHTML = html;
            })
            .catch(error => {
                console.error('Error rendering contact form:', error);
                // Fallback: try to render using WordPress's built-in shortcode function
                if (typeof wp !== 'undefined' && wp.shortcode) {
                    const rendered = wp.shortcode.next('contact-form-7', shortcode);
                    if (rendered) {
                        block.innerHTML = rendered.content;
                    }
                }
            });
        }
    });
});
