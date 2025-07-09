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
	const { title, subtitle, cards, backgroundColor, cardBackgroundColor, textColor, titleColor, subtitleColor, padding, borderRadius, boxShadow, textAlign, cardGap } = attributes;

	const blockStyle = {
		'--sh-bg': backgroundColor,
		'--sh-card-bg': cardBackgroundColor,
		'--sh-text': textColor,
		'--sh-title': titleColor,
		'--sh-subtitle': subtitleColor,
		'--sh-padding': padding,
		'--sh-radius': borderRadius,
		'--sh-shadow': boxShadow,
		'--sh-align': textAlign,
		'--sh-card-gap': cardGap,
	};

	return (
		<section id="support-hours" {...useBlockProps.save({ style: blockStyle })}>
			<div className="support-hours-container">
				<div className="support-hours-card">
					<h2 className="support-hours-title" style={{ color: 'var(--sh-title)' }}>{title}</h2>
					<p className="support-hours-subtitle" style={{ color: 'var(--sh-subtitle)' }}>{subtitle}</p>
					<div className="support-hours-grid" style={{ gap: 'var(--sh-card-gap)', textAlign: textAlign }}>
						{cards && cards.map((card, cardIdx) => (
							<div key={cardIdx} id={card.title ? card.title.toLowerCase().replace(/\s+/g, '-') : undefined} style={{ background: 'var(--sh-card-bg)', color: 'var(--sh-text)', borderRadius: 'var(--sh-radius)', boxShadow: 'var(--sh-shadow)' }}>
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
