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
import { PanelBody, PanelRow, Button, TextControl, SelectControl, RangeControl, ToggleControl, IconButton, ButtonGroup, TabPanel } from '@wordpress/components';

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
		cardContentAlign = 'center', // default to center
		iconSize = 16,
		iconRadius = 20,
		articleCountColor = '#64748b',
		articleCountFontSize = 14,
		articleCountBold = false,
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
					articleCountColor: '', // new field for per-card color
				},
			],
		});
	};

	const removeCard = (index) => {
		const newCards = cards.filter((_, i) => i !== index);
		setAttributes({ cards: newCards });
	};

	// Move card up
	const moveCardUp = (index) => {
		if (index === 0) return; // Can't move first card up
		const newCards = [...cards];
		[newCards[index], newCards[index - 1]] = [newCards[index - 1], newCards[index]];
		setAttributes({ cards: newCards });
	};

	// Move card down
	const moveCardDown = (index) => {
		if (index === cards.length - 1) return; // Can't move last card down
		const newCards = [...cards];
		[newCards[index], newCards[index + 1]] = [newCards[index + 1], newCards[index]];
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


	const articleCountColors = [
		{ color: '#64748b', name: 'Slate (default)' },
		{ color: '#334155', name: 'Dark Slate' },
		{ color: '#2563eb', name: 'Blue' },
		{ color: '#16a34a', name: 'Green' },
		{ color: '#f59e42', name: 'Orange' },
		{ color: '#dc2626', name: 'Red' },
	];

	const sectionStyle = {
		'--section-bg': sectionBg,
		'--card-bg': cardBg,
		'--card-content-align': cardContentAlign,
		'--icon-size': iconSize + 'px',
		'--icon-radius': iconRadius + '%',
		'--article-count-color': articleCountColor,
		'--article-count-font-size': articleCountFontSize + 'px',
		'--article-count-bold': articleCountBold ? 'bold' : 'normal',
	};

	return (
		<>
			<InspectorControls>
				<TabPanel
					tabs={[
						{ name: 'content', title: __('Content', 'category-block') },
						{ name: 'style', title: __('Style', 'category-block') },
					]}
				>
					{(tab) => (
						<>
							{tab.name === 'content' && (
								<>
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
									<PanelBody title={__('Category Cards', 'category-block')} initialOpen={true}>
										{cards.map((card, idx) => (
											<div key={idx} style={{ 
												border: '1px solid #ddd', 
												borderRadius: '8px', 
												marginBottom: '1rem', 
												padding: '1rem',
												backgroundColor: '#f9f9f9'
											}}>
												{/* Card Header with Controls */}
												<div style={{ 
													display: 'flex', 
													justifyContent: 'space-between', 
													alignItems: 'center', 
													marginBottom: '1rem',
													paddingBottom: '0.5rem',
													borderBottom: '1px solid #eee'
												}}>
													<h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
														{__('Card', 'category-block')} #{idx + 1} - {card.title || __('Untitled Card', 'category-block')}
													</h4>
													<ButtonGroup>
														<Button
															isSmall
															icon="arrow-up-alt2"
															label={__('Move Card Up', 'category-block')}
															onClick={() => moveCardUp(idx)}
															disabled={idx === 0}
														/>
														<Button
															isSmall
															icon="arrow-down-alt2"
															label={__('Move Card Down', 'category-block')}
															onClick={() => moveCardDown(idx)}
															disabled={idx === (cards.length - 1)}
														/>
														<Button
															isSmall
															isDestructive
															icon="trash"
															label={__('Remove Card', 'category-block')}
															onClick={() => removeCard(idx)}
														/>
													</ButtonGroup>
												</div>

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
											</div>
										))}
										<Button isPrimary onClick={addCard} style={{ width: '100%' }}>
											{__('Add New Card', 'category-block')}
										</Button>
									</PanelBody>
								</>
							)}
							{tab.name === 'style' && (
								<>
									<PanelBody title={__('Section Background', 'category-block')} initialOpen={true}>
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
									<PanelBody title={__('Card Content Alignment', 'category-block')} initialOpen={false}>
										<PanelRow>
											<SelectControl
												label={__('Card Content Alignment', 'category-block')}
												value={cardContentAlign}
												options={[
													{ label: __('Left', 'category-block'), value: 'left' },
													{ label: __('Center', 'category-block'), value: 'center' },
													{ label: __('Right', 'category-block'), value: 'right' },
												]}
												onChange={(val) => setAttributes({ cardContentAlign: val })}
												help={__('Align card content left, center, or right.', 'category-block')}
											/>
										</PanelRow>
									</PanelBody>
									<PanelBody title={__('Icon Style', 'category-block')} initialOpen={false}>
										<PanelRow>
											<strong>{__('Icon Size', 'category-block')}</strong>
										</PanelRow>
										<PanelRow>
											<RangeControl
												value={iconSize}
												onChange={(val) => setAttributes({ iconSize: val })}
												min={16}
												max={96}
												label={__('Icon Size (px)', 'category-block')}
											/>
										</PanelRow>
										<PanelRow>
											<RangeControl
												value={iconRadius}
												onChange={(val) => setAttributes({ iconRadius: val })}
												min={0}
												max={50}
												label={__('Icon Border Radius (%)', 'category-block')}
											/>
										</PanelRow>
									</PanelBody>
									<PanelBody title={__('Article Count Style', 'category-block')} initialOpen={false}>
										<PanelRow>
											<RangeControl
												value={articleCountFontSize}
												onChange={(val) => setAttributes({ articleCountFontSize: val })}
												min={10}
												max={32}
												label={__('Font Size (px)', 'category-block')}
											/>
										</PanelRow>
										<PanelRow>
											<ToggleControl
												label={__('Bold', 'category-block')}
												checked={!!articleCountBold}
												onChange={(val) => setAttributes({ articleCountBold: val })}
											/>
										</PanelRow>
										<PanelRow>
											<strong>{__('Article Count Text Color', 'category-block')}</strong>
										</PanelRow>
										<PanelRow>
											<ColorPalette
												colors={articleCountColors}
												value={articleCountColor}
												onChange={(color) => setAttributes({ articleCountColor: color })}
												disableCustomColors={false}
											/>
										</PanelRow>
									</PanelBody>
									<PanelBody title={__('Card Style (Repeater)', 'category-block')} initialOpen={false}>
										{cards.map((card, idx) => (
											<div key={idx} style={{ border: '1px solid #eee', borderRadius: 6, marginBottom: 12, padding: 10, background: '#fafbfc' }}>
												<strong>{__('Card', 'category-block')} #{idx + 1}</strong>
												<PanelRow>
													<strong>{__('Article Count Text Color', 'category-block')}</strong>
												</PanelRow>
												<PanelRow>
													<ColorPalette
														colors={articleCountColors}
														value={card.articleCountColor || ''}
														onChange={(color) => updateCard(idx, 'articleCountColor', color)}
														disableCustomColors={false}
													/>
												</PanelRow>
											</div>
										))}
									</PanelBody>
								</>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>
			<div
				{...useBlockProps({ style: sectionStyle })}
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
								className={`category-card align-item-${cardContentAlign}`}
								style={{ background: 'var(--card-bg)' }}
							>
								<div
									className={`icon-box ${card.color}`}
									style={{
										borderRadius: 'var(--icon-radius)',
										width: `calc(var(--icon-size) + 32px)`,
										height: `calc(var(--icon-size) + 32px)`,
									}}
								>
									{card.iconUrl ? (
										<img
											src={card.iconUrl}
											alt={__('Icon', 'category-block')}
											style={{ width: 'var(--icon-size)', height: 'var(--icon-size)', objectFit: 'contain' }}
										/>
									) : (
										<span
											dangerouslySetInnerHTML={{ __html: card.icon }}
											style={{ width: 'var(--icon-size)', height: 'var(--icon-size)', display: 'inline-block' }}
										/>
									)}
								</div>
								<h3>{card.title}</h3>
								<p>{card.description}</p>
								<span
									className="article-count"
									style={{
										color: card.articleCountColor || 'var(--article-count-color)',
										fontSize: 'var(--article-count-font-size)',
										fontWeight: card.articleCountBold ? 'bold' : 'var(--article-count-bold)',
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
			</div>
		</>
	);
}
