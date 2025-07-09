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
		backgroundColor = '#fff',
		titleColor = '#111827',
		subtitleColor = '#666',
		padding = '32px 0',
		borderRadius = '12px',
		boxShadow = '0 2px 8px rgba(0,0,0,0.04)',
		textAlign = 'center',
		cardGap = '24px',
		valueFontSize = 30,
		labelFontSize = 16,
		descFontSize = 14,
	} = attributes;

	const blockStyle = {
		'--rtc-bg': backgroundColor,
		'--rtc-title': titleColor,
		'--rtc-subtitle': subtitleColor,
		'--rtc-padding': padding,
		'--rtc-radius': borderRadius,
		'--rtc-shadow': boxShadow,
		'--rtc-align': textAlign,
		'--rtc-card-gap': cardGap,
	};

	return (
		<section {...useBlockProps.save({ style: blockStyle })}>
			<div className="response-time-container">
				<div className="response-time-header" style={{ textAlign: textAlign }}>
					<h2 className="response-time-title" style={{ color: 'var(--rtc-title)' }}>{title}</h2>
					<p className="response-time-subtitle" style={{ color: 'var(--rtc-subtitle)' }}>{subtitle}</p>
				</div>
				<div
					className="response-time-grid"
					style={{
						gap: 'var(--rtc-card-gap)',
						justifyContent:
							textAlign === 'center'
								? 'center'
								: textAlign === 'right'
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
								textAlign: textAlign,
								borderRadius: 'var(--rtc-radius)',
								boxShadow: 'var(--rtc-shadow)',
							}}
						>
							<div
								className="response-time-value"
								style={{
									color: card.textColor,
									fontSize: valueFontSize,
									fontWeight: 'bold',
								}}
							>
								{card.value}
							</div>
							<div
								className="response-time-label"
								style={{
									fontSize: labelFontSize,
								}}
							>
								{card.label}
							</div>
							<div
								className="response-time-desc"
								style={{
									fontSize: descFontSize,
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
