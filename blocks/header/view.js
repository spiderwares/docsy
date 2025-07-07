/**
 * Use this file for JavaScript code that you want to run in the front-end 
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any 
 * JavaScript running in the front-end, then you should delete this file and remove 
 * the `viewScript` property from `block.json`. 
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
 
/* eslint-disable no-console */

// Header block frontend functionality
// This script handles the header block's frontend interactions
// The dynamic menu is rendered server-side by PHP and replaced in the DOM
document.addEventListener('DOMContentLoaded', function() {
    const headerBlocks = document.querySelectorAll('.wp-block-docsy-header');
    
    headerBlocks.forEach(function(headerBlock) {
        const navLinks = headerBlock.querySelectorAll('.nav-link');
        const logo = headerBlock.querySelector('.logo-bg');
        const siteTitle = headerBlock.querySelector('.site-title');
        
        // Check if this is a dynamic menu (not the fallback container)
        const dynamicContainer = headerBlock.querySelector('.dynamic-menu-container');
        const isDynamicMenu = dynamicContainer && !dynamicContainer.querySelector('.nav-link');
        
        // Add smooth scrolling for anchor links
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // If it's an anchor link, prevent default and smooth scroll
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Add click effect to logo
        if (logo) {
            logo.addEventListener('click', function() {
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
        
        // Add click effect to site title
        if (siteTitle) {
            siteTitle.addEventListener('click', function() {
                // Navigate to home page or reload current page
                window.location.href = '/';
            });
        }
        
        // Add mobile menu toggle functionality
        const headerNav = headerBlock.querySelector('.header-nav');
        if (headerNav && window.innerWidth <= 768) {
            // Create mobile menu toggle button
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '<span></span><span></span><span></span>';
            mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
            
            // Insert toggle button before nav
            headerNav.parentNode.insertBefore(mobileToggle, headerNav);
            
            // Add toggle functionality
            mobileToggle.addEventListener('click', function() {
                headerNav.classList.toggle('mobile-menu-open');
                this.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!headerBlock.contains(e.target)) {
                    headerNav.classList.remove('mobile-menu-open');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    });
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const headerBlocks = document.querySelectorAll('.wp-block-docsy-header .header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        headerBlocks.forEach(function(header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        });
        
        lastScrollTop = scrollTop;
    });
});

console.log("Header block frontend script loaded!");
/* eslint-enable no-console */
