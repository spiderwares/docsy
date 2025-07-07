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
	const { title, subtitle, cards, backgroundColor, textColor } = attributes;
	return (
		<section id="support-hours" className="support-hours-section" {...useBlockProps.save()}>
			<div className="support-hours-container">
				<div className="support-hours-card" style={{ background: backgroundColor, color: textColor }}>
					<h2 className="support-hours-title">{title}</h2>
					<p className="support-hours-subtitle">{subtitle}</p>
					<div className="support-hours-grid">
						{cards && cards.map((card, cardIdx) => (
							<div key={cardIdx} id={card.title ? card.title.toLowerCase().replace(/\s+/g, '-') : undefined}>
								<h3 className="support-hours-heading">{card.title}</h3>
								<div className="support-hours-text">
									{card.rows && card.rows.map((row, rowIdx) => (
										<div key={rowIdx}>{row.label}{row.hours ? `: ${row.hours}` : ''}</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
