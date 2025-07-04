/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

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
	const {
		faqs = [],
		textColor,
		backgroundColor,
		headerTitle = 'Frequently Asked Questions',
		headerSubtitle = 'Quick answers to common questions',
	} = attributes;
	return (
		<section
			id="faq-section"
			style={{ backgroundColor, color: textColor, padding: '16px' }}
		>
			<div className="faq-container">
				<div className="faq-header">
					<h2>{headerTitle}</h2>
					<p>{headerSubtitle}</p>
				</div>
				<div className="faq-list">
					{faqs.map((faq, i) => (
						<div id={`faq-${i}`} className="faq-item" key={i}>
							<button type="button">
								<span>{faq.question}</span>
								<i className="faq-icon">
									<svg
										width="16"
										height="16"
										viewBox="0 0 448 512"
										style={{ transition: 'transform 0.2s' }}
									>
										<path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
									</svg>
								</i>
							</button>
							<div className="faq-content">
								<p>{faq.answer}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
