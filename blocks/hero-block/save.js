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
	const {
		title = '',
		subtitle = '',
		placeholder = '',
		showSearch = true, // default to true for backward compatibility
		backgroundColor, titleColor, subtitleColor, padding, borderRadius, boxShadow, textAlign, searchInputBg
	} = attributes || {};

	const defaultTitle = 'How can we help you?';
	const defaultSubtitle = 'Search our knowledge base for answers';
	const defaultPlaceholder = 'Search for articles...';

	const heroStyle = {
		'--hero-bg': backgroundColor,
		'--hero-title-color': titleColor,
		'--hero-subtitle-color': subtitleColor,
		'--hero-padding': padding,
		'--hero-radius': borderRadius,
		'--hero-shadow': boxShadow,
		'--hero-align': textAlign,
		'--hero-search-bg': searchInputBg,
	};

	return (
		<section id="hero-search" className="hero-search" {...useBlockProps.save({ style: heroStyle })}>
			<div className="container text-center">
				<RichText.Content
					tagName="h1"
					className="hero-title"
					value={title || defaultTitle}
				/>
				<RichText.Content
					tagName="p"
					className="hero-subtitle"
					value={subtitle || defaultSubtitle}
				/>
				{showSearch && (
					<div className="search-wrapper">
						<div className="search-box">
							<input
								type="text"
								placeholder={placeholder || defaultPlaceholder}
								className="search-input"
								style={{ background: 'var(--hero-search-bg)' }}
							/>
							<button className="search-button">
								<svg
									className="search-icon"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 
											45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 
											40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 
											208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
									/>
								</svg>
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
