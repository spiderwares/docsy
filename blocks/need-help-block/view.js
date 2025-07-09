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
console.log("Hello World! (from docsy-need-help-block block)");
/* eslint-enable no-console */

document.addEventListener('DOMContentLoaded', function () {
	const block = document.querySelectorAll('.wp-block-docsy-need-help-block');
	block.forEach(section => {
		const buttons = section.querySelectorAll('a');
		buttons.forEach(btn => {
			const bg = btn.style.background;
			const color = btn.style.color;
			const border = btn.style.border;
			const hoverBg = btn.getAttribute('data-hover-bg');
			const hoverColor = btn.getAttribute('data-hover-color');
			const hoverBorder = btn.getAttribute('data-hover-border');

			if (hoverBg || hoverColor || hoverBorder) {
				btn.addEventListener('mouseenter', function () {
					if (hoverBg) btn.style.background = hoverBg;
					if (hoverColor) btn.style.color = hoverColor;
					if (hoverBorder) btn.style.border = hoverBorder;
				});
				btn.addEventListener('mouseleave', function () {
					btn.style.background = bg;
					btn.style.color = color;
					btn.style.border = border;
				});
			}
		});
	});
});
