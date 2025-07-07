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
		heading = 'Browse by Category',
		subheading = 'Find the help you need organized by topic',
		sectionBg = '#f8fafc',
		cardBg = '#fff',
		cardContentAlign = 'center',
		iconSize = 22,
		iconRadius = 10,
		articleCountColor = '#64748b',
		articleCountFontSize = 14,
		articleCountBold = false,
	} = attributes;
	return (
		<section {...useBlockProps.save()} style={{ background: sectionBg }}>
		<div className="category-container">
			<div className="section-header">
				<h2>{heading}</h2>
				<p>{subheading}</p>
			</div>
			<div className="category-grid">
				{cards.map((card, idx) => (
					<div
						key={idx}
						className={`category-card align-item-${cardContentAlign}`}
						style={{ background: cardBg }}
					>
						<div
							className={`icon-box ${card.color}`}
							style={{
								borderRadius: `${iconRadius}%`,
								width: iconSize + 32,
								height: iconSize + 32,
								
							}}
						>
							{card.iconUrl ? (
								<img
									src={card.iconUrl}
									alt="Icon"
									style={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
								/>
							) : (
								<span
									dangerouslySetInnerHTML={{ __html: card.icon }}
									style={{ width: iconSize, height: iconSize, display: 'inline-block' }}
								/>
							)}
						</div>
						<h3>{card.title}</h3>
						<p>{card.description}</p>
						<span
							className="article-count"
							style={{
								color: card.articleCountColor || articleCountColor,
								fontSize: articleCountFontSize,
								fontWeight: articleCountBold ? 'bold' : 'normal',
								display: 'block',
								marginTop: 8,
							}}
						>
							{card.articles}
						</span>
					</div>
				))}
			</div>
		</div>
		</section>
	);
}
