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
import { useBlockProps, InspectorControls, MediaUpload } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useState, useEffect } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	__experimentalInputControl as InputControl,
	ColorPalette,
	ButtonGroup,
	TabPanel,
	RangeControl,
	SelectControl
} from '@wordpress/components';

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
		articles: attrArticles,
		backgroundColor, titleColor, subtitleColor, padding, borderRadius, boxShadow, textAlign, cardGap
	} = attributes;

	const defaultArticles = [
		{
			title: 'How to get started with your first booking',
			description: 'Learn the essential steps to create your first booking and configure basic settings.',
			meta: 'Updated 2 days ago',
			icon: 'play',
			color: 'green',
			bgColor: '#ffffff',
			iconColor: '#34D399',
			iconBgColor: '#e6f9f2',
			iconUrl: '',
		},
		{
			title: 'Setting up availability and time slots',
			description: 'Configure your available hours, time slots, and booking restrictions.',
			meta: 'Updated 1 week ago',
			icon: 'calendar',
			color: 'blue',
			bgColor: '#ffffff',
			iconColor: '#60A5FA',
			iconBgColor: '#e6f0fa',
			iconUrl: '',
		},
		{
			title: 'Customizing the booking form appearance',
			description: 'Style your booking forms to match your brand and website design.',
			meta: 'Updated 3 days ago',
			icon: 'palette',
			color: 'purple',
			bgColor: '#ffffff',
			iconColor: '#A78BFA',
			iconBgColor: '#f3eafe',
			iconUrl: '',
		},
		{
			title: 'Email notifications and confirmations',
			description: 'Set up automated emails for bookings, confirmations, and reminders.',
			meta: 'Updated 5 days ago',
			icon: 'envelope',
			color: 'orange',
			bgColor: '#ffffff',
			iconColor: '#FB923C',
			iconBgColor: '#fff5eb',
			iconUrl: '',
		},
	];

	// Initialize articles with default data if empty (first time block is added)
	useEffect(() => {
		if (!attrArticles || !Array.isArray(attrArticles) || attrArticles.length === 0) {
			setAttributes({ articles: defaultArticles });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Always fill missing fields for each article for both editor and frontend consistency
	const articles = (
		attrArticles && Array.isArray(attrArticles) && attrArticles.length
			? attrArticles.map((article, idx) => ({
				title: article.title ?? defaultArticles[idx]?.title ?? '',
				description: article.description ?? defaultArticles[idx]?.description ?? '',
				meta: article.meta ?? defaultArticles[idx]?.meta ?? '',
				icon: article.icon ?? defaultArticles[idx]?.icon ?? 'play',
				color: article.color ?? defaultArticles[idx]?.color ?? 'green',
				bgColor: article.bgColor ?? defaultArticles[idx]?.bgColor ?? '#ffffff',
				iconColor: article.iconColor ?? defaultArticles[idx]?.iconColor ?? '#34D399',
				iconBgColor: article.iconBgColor ?? defaultArticles[idx]?.iconBgColor ?? '#e6f9f2',
				iconUrl: article.iconUrl ?? '',
			}))
			: defaultArticles
	);

	const updateArticle = (index, field, value) => {
		const newArticles = [...articles];
		newArticles[index][field] = value;
		setAttributes({ articles: newArticles });
	};

	const addArticle = () => {
		const newArticles = [
			...articles,
			{ title: '', description: '', meta: '', icon: 'play', color: 'green', iconUrl: '', bgColor: '', iconColor: '', iconBgColor: '' },
		];
		setAttributes({ articles: newArticles });
	};

	const removeArticle = (index) => {
		const newArticles = articles.filter((_, i) => i !== index);
		setAttributes({ articles: newArticles });
	};

	// Move article up
	const moveArticleUp = (index) => {
		if (index === 0) return; // Can't move first article up
		const newArticles = [...articles];
		[newArticles[index], newArticles[index - 1]] = [newArticles[index - 1], newArticles[index]];
		setAttributes({ articles: newArticles });
	};

	// Move article down
	const moveArticleDown = (index) => {
		if (index === articles.length - 1) return; // Can't move last article down
		const newArticles = [...articles];
		[newArticles[index], newArticles[index + 1]] = [newArticles[index + 1], newArticles[index]];
		setAttributes({ articles: newArticles });
	};

	const iconSVG = (icon, iconColor) => {
		const color = iconColor || 'currentColor';
		switch (icon) {
			case 'play':
				return (
					<svg width="24" height="24" fill={color}><polygon points="6,4 20,12 6,20" /></svg>
				);
			case 'calendar':
				return (
					<svg width="24" height="2" fill={color}><rect x="3" y="6" width="18" height="15" rx="2"/><rect x="7" y="2" width="2" height="4"/><rect x="15" y="2" width="2" height="4"/></svg>
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

	const colorClass = (color) => {
		switch (color) {
			case 'green': return 'green-bg green-icon';
			case 'blue': return 'blue-bg blue-icon';
			case 'purple': return 'purple-bg purple-icon';
			case 'orange': return 'orange-bg orange-icon';
			default: return '';
		}
	};

	const stylePresets = [
		{ name: 'Blue', color: '#21759b' },
		{ name: 'White', color: '#fff' },
		{ name: 'Light Gray', color: '#f3f4f6' },
		{ name: 'Black', color: '#222' },
		{ name: 'Green', color: '#34D399' },
		{ name: 'Purple', color: '#A78BFA' },
		{ name: 'Orange', color: '#FB923C' },
	];

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
		<>
			<InspectorControls>
				<TabPanel
					tabs={[
						{ name: 'content', title: __('Content', 'popular-articles-block') },
						{ name: 'style', title: __('Style', 'popular-articles-block') },
					]}
				>
					{(tab) => (
						<>
							{tab.name === 'content' && (
								<PanelBody title={__('Articles', 'popular-articles-block')} initialOpen={true}>
									{articles.map((article, idx) => (
										<div key={idx} style={{ 
											border: '1px solid #ddd', 
											borderRadius: '8px', 
											marginBottom: '1rem', 
											padding: '1rem',
											backgroundColor: '#f9f9f9'
										}}>
											{/* Article Header with Controls */}
											<div style={{ 
												display: 'flex', 
												justifyContent: 'space-between', 
												alignItems: 'center', 
												marginBottom: '1rem',
												paddingBottom: '0.5rem',
												borderBottom: '1px solid #eee'
											}}>
												<h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
													{__('Article', 'popular-articles-block')} #{idx + 1} - {article.title || __('Untitled Article', 'popular-articles-block')}
												</h4>
												<ButtonGroup>
													<Button
														isSmall
														icon="arrow-up-alt2"
														label={__('Move Article Up', 'popular-articles-block')}
														onClick={() => moveArticleUp(idx)}
														disabled={idx === 0}
													/>
													<Button
														isSmall
														icon="arrow-down-alt2"
														label={__('Move Article Down', 'popular-articles-block')}
														onClick={() => moveArticleDown(idx)}
														disabled={idx === (articles.length - 1)}
													/>
													<Button
														isSmall
														isDestructive
														icon="trash"
														label={__('Remove Article', 'popular-articles-block')}
														onClick={() => removeArticle(idx)}
														disabled={articles.length <= 1}
													/>
												</ButtonGroup>
											</div>

											<TextControl
												label={__('Title', 'popular-articles-block')}
												value={article.title}
												onChange={(val) => updateArticle(idx, 'title', val)}
											/>
											<TextareaControl
												label={__('Description', 'popular-articles-block')}
												value={article.description}
												onChange={(val) => updateArticle(idx, 'description', val)}
											/>
											<TextControl
												label={__('Meta', 'popular-articles-block')}
												value={article.meta}
												onChange={(val) => updateArticle(idx, 'meta', val)}
											/>
											<TextControl
												label={__('Icon (play, calendar, palette, envelope)', 'popular-articles-block')}
												value={article.icon}
												onChange={(val) => updateArticle(idx, 'icon', val)}
											/>
											<TextControl
												label={__('Color (green, blue, purple, orange)', 'popular-articles-block')}
												value={article.color}
												onChange={(val) => updateArticle(idx, 'color', val)}
											/>
											<MediaUpload
												onSelect={(media) => updateArticle(idx, 'iconUrl', media.url)}
												allowedTypes={['image']}
												value={article.iconUrl}
												render={({ open }) => (
													<div style={{ marginTop: '8px' }}>
														<Button onClick={open} isSecondary>
															{article.iconUrl
																? __('Change Icon Image', 'popular-articles-block')
																: __('Upload Icon Image', 'popular-articles-block')}
														</Button>
														{article.iconUrl && (
															<div style={{ marginTop: '8px' }}>
																<img src={article.iconUrl} alt="" style={{ width: 32, height: 32, objectFit: 'contain' }} />
																<Button
																	isLink
																	isDestructive
																	onClick={() => updateArticle(idx, 'iconUrl', '')}
																	style={{ display: 'block', marginTop: '4px' }}
																>
																	{__('Remove Icon Image', 'popular-articles-block')}
																</Button>
															</div>
														)}
													</div>
												)}
											/>
										</div>
									))}
									<Button isPrimary onClick={addArticle} style={{ width: '100%' }}>
										{__('Add New Article', 'popular-articles-block')}
									</Button>
								</PanelBody>
							)}
							{tab.name === 'style' && (
								<>
									<PanelBody title={__('Block Style', 'popular-articles-block')} initialOpen={true}>
										<ColorPalette
											colors={stylePresets}
											value={backgroundColor}
											onChange={(color) => setAttributes({ backgroundColor: color })}
										/>
										<TextControl
											label={__('Padding', 'popular-articles-block')}
											value={padding}
											onChange={(value) => setAttributes({ padding: value })}
											placeholder="2rem 1rem"
										/>
										<TextControl
											label={__('Border Radius', 'popular-articles-block')}
											value={borderRadius}
											onChange={(value) => setAttributes({ borderRadius: value })}
											placeholder="0px"
										/>
										<TextControl
											label={__('Box Shadow', 'popular-articles-block')}
											value={boxShadow}
											onChange={(value) => setAttributes({ boxShadow: value })}
											placeholder="none"
										/>
										<SelectControl
											label={__('Text Align', 'popular-articles-block')}
											value={textAlign}
											onChange={(value) => setAttributes({ textAlign: value })}
											options={[
												{ label: __('Left', 'popular-articles-block'), value: 'left' },
												{ label: __('Center', 'popular-articles-block'), value: 'center' },
												{ label: __('Right', 'popular-articles-block'), value: 'right' },
											]}
										/>
										<TextControl
											label={__('Card Gap', 'popular-articles-block')}
											value={cardGap}
											onChange={(value) => setAttributes({ cardGap: value })}
											placeholder="2rem"
										/>
									</PanelBody>
									<PanelBody title={__('Title Style', 'popular-articles-block')} initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={titleColor}
											onChange={(color) => setAttributes({ titleColor: color })}
										/>
									</PanelBody>
									<PanelBody title={__('Subtitle Style', 'popular-articles-block')} initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={subtitleColor}
											onChange={(color) => setAttributes({ subtitleColor: color })}
										/>
									</PanelBody>
									<PanelBody title={__('Card Style (Repeater)', 'popular-articles-block')} initialOpen={false}>
										{articles.map((article, idx) => (
											<div key={idx} style={{ border: '1px solid #eee', borderRadius: 6, marginBottom: 12, padding: 10, background: '#fafbfc' }}>
												<strong>{__('Article', 'popular-articles-block')} #{idx + 1}</strong>
											</div>
										))}
									</PanelBody>
								</>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>
			<section id="popular-articles" className="popular-articles" {...useBlockProps({ style: blockStyle })}>
				<div className="popular-container">
					<div className="section-header">
						<h2 className="section-title" style={{ color: 'var(--popular-title-color)' }}>{__('Popular Articles', 'popular-articles-block')}</h2>
						<p className="section-subtitle" style={{ color: 'var(--popular-subtitle-color)' }}>{__('Most viewed articles this week', 'popular-articles-block')}</p>
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
									<i className= {` ${article.color}-icon popular-icon`}>
										{article.iconUrl
											? <img src={article.iconUrl} alt={article.title || 'Article icon'} style={{ width: 32, height: 32, objectFit: 'contain' }} />
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
		</>
	);
}
