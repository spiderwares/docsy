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
		cards = [],
		title = 'Response Times',
		subtitle = "Here's what you can expect when contacting us",
		align = 'center',
	} = attributes;

	return (
		<section className="response-time-section">
			<div className="response-time-container">
				<div className="response-time-header" style={{ textAlign: align }}>
					<h2 className="response-time-title">{title}</h2>
					<p className="response-time-subtitle">{subtitle}</p>
				</div>
				<div
					className="response-time-grid"
					style={{
						justifyContent:
							align === 'center'
								? 'center'
								: align === 'right'
								? 'flex-end'
								: 'flex-start',
					}}
				>
					{cards.map((card, idx) => (
						<div
							key={idx}
							className="response-card"
							style={{
								borderLeft: `4px solid ${card.borderColor}`,
								background: card.bgColor,
								color: card.textColor,
								textAlign: align,
							}}
						>
							<div
								className="response-time-value"
								style={{
									color: card.textColor,
									fontSize: card.valueSize,
									fontWeight: 'bold',
								}}
							>
								{card.value}
							</div>
							<div
								className="response-time-label"
								style={{
									fontSize: card.labelSize,
									fontWeight: 600,
								}}
							>
								{card.label}
							</div>
							<div
								className="response-time-desc"
								style={{
									fontSize: card.descSize,
								}}
							>
								{card.desc}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
