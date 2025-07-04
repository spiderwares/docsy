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
		if (!attributes.articles || !Array.isArray(attributes.articles) || attributes.articles.length === 0) {
			setAttributes({ articles: defaultArticles });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Always fill missing fields for each article for both editor and frontend consistency
	const articles = (
		attributes?.articles && Array.isArray(attributes.articles) && attributes.articles.length
			? attributes.articles.map((article, idx) => ({
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

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Articles', 'popular-articles-block')} initialOpen={true}>
					{articles.map((article, idx) => (
						<div key={idx} style={{ marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
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
							<div style={{ marginTop: '8px' }}>
								<p style={{ marginBottom: 4 }}>{__('Article Background Color', 'popular-articles-block')}</p>
								<ColorPalette
									value={article.bgColor}
									onChange={(color) => updateArticle(idx, 'bgColor', color)}
								/>
							</div>
							<div style={{ marginTop: '8px' }}>
								<p style={{ marginBottom: 4 }}>{__('Icon Color', 'popular-articles-block')}</p>
								<ColorPalette
									value={article.iconColor}
									onChange={(color) => updateArticle(idx, 'iconColor', color)}
								/>
							</div>
							<div style={{ marginTop: '8px' }}>
								<p style={{ marginBottom: 4 }}>{__('Icon Background Color', 'popular-articles-block')}</p>
								<ColorPalette
									value={article.iconBgColor}
									onChange={(color) => updateArticle(idx, 'iconBgColor', color)}
								/>
							</div>
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
							<Button
								isDestructive
								onClick={() => removeArticle(idx)}
								style={{ marginTop: '8px' }}
								disabled={articles.length <= 1}
							>
								{__('Remove Article', 'popular-articles-block')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addArticle}>
						{__('Add Article', 'popular-articles-block')}
					</Button>
				</PanelBody>
			</InspectorControls>
			<section id="popular-articles" className="popular-articles" {...useBlockProps()}>
				<div className="popular-container">
					<div className="section-header">
						<h2 className="section-title">{__('Popular Articles', 'popular-articles-block')}</h2>
						<p className="section-subtitle">{__('Most viewed articles this week', 'popular-articles-block')}</p>
					</div>
					<div className="articles-grid">
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
