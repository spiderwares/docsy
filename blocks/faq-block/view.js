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
console.log("Hello World! (from docsy-faq-block block)");
/* eslint-enable no-console */
document.addEventListener('DOMContentLoaded', function () {
	function toggleFaq(id) {
		const faqItem = document.getElementById(id);
		if (!faqItem) return;
		const button = faqItem.querySelector('button');
		const faqContent = faqItem.querySelector('.faq-content');
		const icon = faqItem.querySelector('.faq-icon svg');

		// Close all others and remove rotation from all icons
		document.querySelectorAll('.faq-content').forEach(el => {
			if (el !== faqContent) {
				el.classList.remove('show');
				el.style.display = 'none';
			}
		});
		document.querySelectorAll('.faq-icon svg').forEach(el => {
			if (el !== icon) el.classList.remove('rotated');
		});

		// Toggle this FAQ
		const isOpen = faqContent.classList.contains('show');
		if (isOpen) {
			faqContent.classList.remove('show');
			faqContent.style.display = 'none';
			if (icon) icon.classList.remove('rotated');
		} else {
			faqContent.classList.add('show');
			faqContent.style.display = 'block';
			if (icon) icon.classList.add('rotated');
		}
	}

	// Attach click handlers
	document.querySelectorAll('.faq-item button').forEach(button => {
		button.addEventListener('click', function () {
			const faqItem = button.closest('.faq-item');
			if (faqItem && faqItem.id) {
				toggleFaq(faqItem.id);
			}
		});
	});

	// Hide all contents by default
	document.querySelectorAll('.faq-content').forEach(el => {
		el.classList.remove('show');
		el.style.display = 'none';
	});
});