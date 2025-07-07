/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { logo, repeater = [], footerText = '' } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			{logo && (
				<div className="footer-logo">
					<img src={logo.url} alt={logo.alt || ''} style={{ maxWidth: '120px', height: 'auto' }} />
				</div>
			)}
			<RichText.Content tagName="div" value={footerText} className="footer-text" />
			{repeater && repeater.length > 0 && (
				<ul className="footer-repeater">
					{repeater.map((item, idx) => (
						<li key={idx} className="footer-repeater-item">{item.text}</li>
					))}
				</ul>
			)}
		</div>
	);
}
