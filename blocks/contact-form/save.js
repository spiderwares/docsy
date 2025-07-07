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
 * @param {Object} props Props.
 * @param {Object} props.attributes Block attributes.
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { title, subtitle, formShortcode } = attributes;

	return (
		<section {...useBlockProps.save()} id="contact-form-section" className="contact-form-section">
			<div className="contact-container">
				<div className="contact-header">
					<RichText.Content
						tagName="h2"
						className="contact-title"
						value={title}
					/>
					<RichText.Content
						tagName="p"
						className="contact-subtitle"
						value={subtitle}
					/>
				</div>

				<div className="contact-box">
					<div 
						className="contact-form-content"
						dangerouslySetInnerHTML={{ __html: formShortcode }}
					/>
				</div>
			</div>
		</section>
	);
}
