/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, PanelRow, Button, TextControl, SelectControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		cards = [],
		heading = 'Browse by Category',
		subheading = 'Find the help you need organized by topic',
		sectionBg = '#f8fafc',
		cardBg = '#fff',
	} = attributes;

	const updateCard = (index, field, value) => {
		const newCards = [...cards];
		newCards[index][field] = value;
		setAttributes({ cards: newCards });
	};

	const addCard = () => {
		setAttributes({
			cards: [
				...cards,
				{
					icon: 'rocket',
					iconUrl: '',
					color: 'green',
					title: 'New Category',
					description: 'Category description',
					articles: '0 articles',
				},
			],
		});
	};

	const removeCard = (index) => {
		const newCards = cards.filter((_, i) => i !== index);
		setAttributes({ cards: newCards });
	};

	const sectionBgColors = [
		{ color: '#f8fafc', name: 'Gray (default)' },
		{ color: '#fff', name: 'White' },
		{ color: '#f3f4f6', name: 'Light Gray' },
		{ color: '#e0e7ff', name: 'Indigo-100' },
		{ color: '#dbeafe', name: 'Blue-100' },
		{ color: '#d1fae5', name: 'Green-100' },
	];

	const cardBgColors = [
		{ color: '#fff', name: 'White (default)' },
		{ color: '#f8fafc', name: 'Gray' },
		{ color: '#f3f4f6', name: 'Light Gray' },
		{ color: '#e0e7ff', name: 'Indigo-100' },
		{ color: '#dbeafe', name: 'Blue-100' },
		{ color: '#d1fae5', name: 'Green-100' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Section Heading', 'category-block')} initialOpen={true}>
					<PanelRow>
						<TextControl
							label={__('Heading', 'category-block')}
							value={heading}
							onChange={(val) => setAttributes({ heading: val })}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Subheading', 'category-block')}
							value={subheading}
							onChange={(val) => setAttributes({ subheading: val })}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Section Background', 'category-block')} initialOpen={false}>
					<PanelRow>
						<strong>{__('Section Background Color', 'category-block')}</strong>
					</PanelRow>
					<PanelRow>
						<ColorPalette
							colors={sectionBgColors}
							value={sectionBg}
							onChange={(color) => setAttributes({ sectionBg: color })}
							disableCustomColors={false}
						/>
					</PanelRow>
					<PanelRow>
						<strong>{__('Card Background Color', 'category-block')}</strong>
					</PanelRow>
					<PanelRow>
						<ColorPalette
							colors={cardBgColors}
							value={cardBg}
							onChange={(color) => setAttributes({ cardBg: color })}
							disableCustomColors={false}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Category Cards', 'category-block')} initialOpen={true}>
					{cards.map((card, idx) => (
						<div key={idx} style={{ borderBottom: '1px solid #eee', marginBottom: 16, paddingBottom: 8 }}>
							<PanelRow>
								<strong>{__('Card', 'category-block')} {idx + 1}</strong>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__('Title', 'category-block')}
									value={card.title}
									onChange={(val) => updateCard(idx, 'title', val)}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__('Description', 'category-block')}
									value={card.description}
									onChange={(val) => updateCard(idx, 'description', val)}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__('Articles', 'category-block')}
									value={card.articles}
									onChange={(val) => updateCard(idx, 'articles', val)}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__('Color (class)', 'category-block')}
									value={card.color}
									onChange={(val) => updateCard(idx, 'color', val)}
									help={__('Use: green, blue, purple, orange, red, indigo', 'category-block')}
								/>
							</PanelRow>
							
							<PanelRow>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => updateCard(idx, 'iconUrl', media.url)}
										allowedTypes={['image']}
										value={card.iconUrl}
										render={({ open }) => (
											<Button onClick={open} isSecondary>
												{card.iconUrl
													? (
														<img
															src={card.iconUrl}
															alt={__('Icon', 'category-block')}
															style={{ width: 32, height: 32, objectFit: 'contain', marginRight: 8, verticalAlign: 'middle' }}
														/>
													)
													: __('Upload Icon', 'category-block')
												}
											</Button>
										)}
									/>
								</MediaUploadCheck>
								{card.iconUrl && (
									<Button
										isLink
										isDestructive
										onClick={() => updateCard(idx, 'iconUrl', '')}
										style={{ marginLeft: 8 }}
									>
										{__('Remove', 'category-block')}
									</Button>
								)}
							</PanelRow>
							<PanelRow>
								<Button
									isDestructive
									onClick={() => removeCard(idx)}
									size="small"
								>
									{__('Remove', 'category-block')}
								</Button>
							</PanelRow>
						</div>
					))}
					<Button isPrimary onClick={addCard}>
						{__('Add Category Card', 'category-block')}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps()}
				style={{ background: sectionBg }}
			>
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
									) : (
										<span dangerouslySetInnerHTML={{ __html: card.icon }} />
									)}
								</div>
								<h3>{card.title}</h3>
								<p>{card.description}</p>
								<span className="article-count">{card.articles}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
