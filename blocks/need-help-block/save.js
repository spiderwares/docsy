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
	const { heading, description, buttons = [], backgroundColor, headingColor, descriptionColor, padding, borderRadius, boxShadow, textAlign, buttonGap, buttonBorderRadius } = attributes;

	const blockStyle = {
		'--nh-bg': backgroundColor,
		'--nh-heading': headingColor,
		'--nh-desc': descriptionColor,
		'--nh-padding': padding,
		'--nh-radius': borderRadius,
		'--nh-shadow': boxShadow,
		'--nh-align': textAlign,
		'--nh-button-gap': buttonGap,
		'--nh-button-radius': buttonBorderRadius,
	};

	return (
		<section { ...useBlockProps.save({ style: blockStyle }) }>
			<div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
				<h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--nh-heading)', marginBottom: '1rem' }}>{heading}</h2>
				<p style={{ fontSize: '1.125rem', color: 'var(--nh-desc)', marginBottom: '2rem' }}>{description}</p>
				<div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--nh-button-gap)', justifyContent: 'center', flexWrap: 'wrap' }}>
					{buttons.map((btn, i) => (
						<a
							key={i}
							href={btn.url}
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								background: btn.bgColor,
								color: btn.textColor,
								border: btn.border,
								padding: '0.75rem 2rem',
								borderRadius: 'var(--nh-button-radius)',
								fontWeight: 600,
								transition: 'all 0.2s',
								cursor: 'pointer',
								textDecoration: 'none',
								position: 'relative'
							}}
							data-hover-bg={btn.hoverBgColor}
							data-hover-color={btn.hoverTextColor}
							data-hover-border={btn.hoverBorder}
						>
							{btn.icon && (
								<svg
									className="button-icon"
									style={{ marginRight: 8, width: 22, height: 22, display: 'inline-flex', alignItems: 'center' }}
									dangerouslySetInnerHTML={{ __html: btn.icon }}
								/>
							)}
							{btn.text}
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
