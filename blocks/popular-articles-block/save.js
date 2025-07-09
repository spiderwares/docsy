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
		articles = [],
		backgroundColor, titleColor, subtitleColor, padding, borderRadius, boxShadow, textAlign, cardGap, gridColumns
	} = attributes || {};

	const iconSVG = (icon, iconColor) => {
		const color = iconColor || 'currentColor';
		switch (icon) {
			case 'play':
				return (
					<svg width="24" height="24" fill={color}><polygon points="6,4 20,12 6,20" /></svg>
				);
			case 'calendar':
				return (
					<svg width="24" height="24" fill={color}><rect x="3" y="6" width="18" height="15" rx="2"/><rect x="7" y="2" width="2" height="4"/><rect x="15" y="2" width="2" height="4"/></svg>
				);
			case 'palette':
				return (
					<svg width="24" height="24" fill={color}><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1"/><circle cx="16" cy="10" r="1"/><circle cx="12" cy="16" r="1"/></svg>
				);
			case 'envelope':
				return (
					<svg width="24" height="24" fill={color}><rect x="2" y="6" width="20" height="12" rx="2"/><polyline points="2,6 12,13 22,6"/></svg>
				);
			default:
				return null;
		}
	};

	const blockStyle = {
		'--popular-bg': backgroundColor,
		'--popular-title-color': titleColor,
		'--popular-subtitle-color': subtitleColor,
		'--popular-padding': padding,
		'--popular-radius': borderRadius,
		'--popular-shadow': boxShadow,
		'--popular-align': textAlign,
		'--popular-card-gap': cardGap,
	};

	return (
		<section id="popular-articles" className="popular-articles" {...useBlockProps.save({ style: blockStyle })}>
			<div className="popular-container">
				<div className="section-header">
					<h2 className="section-title" style={{ color: 'var(--popular-title-color)' }}>Popular Articles</h2>
					<p className="section-subtitle" style={{ color: 'var(--popular-subtitle-color)' }}>Most viewed articles this week</p>
				</div>
				<div className="articles-grid" style={{ gap: 'var(--popular-card-gap)' }}>
				{articles.map((article, idx) => (
						<div
							key={idx}
							id={`article-${idx + 1}`}
							className="article-card"
							style={article.bgColor ? { backgroundColor: article.bgColor } : {}}
						>
							<div
								className={`icon-wrapper ${article.color}-bg`}
								style={article.iconBgColor ? { backgroundColor: article.iconBgColor } : {}}
							>
								<i className={` ${article.color}-icon popular-icon`} >
									{article.iconUrl
										? <img src={article.iconUrl} alt="" style={{ width: 32, height: 32, objectFit: 'contain' }} />
										: iconSVG(article.icon, article.iconColor)
									}
								</i>
							</div>
							<div className="article-content">
								<h3 className="article-title">{article.title}</h3>
								<p className="article-description">{article.description}</p>
								<span className="article-meta">{article.meta}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
