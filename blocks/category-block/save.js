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
						className="category-card"
						style={{ background: cardBg }}
					>
						<div className={`icon-box ${card.color}`}>
							{card.iconUrl ? (
								<img
									src={card.iconUrl}
									alt={__('Icon', 'category-block')}
									style={{ width: 32, height: 32, objectFit: 'contain' }}
								/>
							) : card.icon?.includes('<svg') ? (
								<svg style={{ width: 22, height: 22, objectFit: 'contain' }} dangerouslySetInnerHTML={{ __html: card.icon }} />
							) : (
								<i className={`icon icon-${card.icon}`}></i>
							)}

						</div>
						<h3>{card.title}</h3>
						<p>{card.description}</p>
						<span className="article-count">{card.articles}</span>
					</div>
				))}
			</div>
		</div>
		</section>
	);
}
