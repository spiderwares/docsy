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
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';

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
import { PanelBody, Button, TextControl, IconButton, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { 
		logo, 
		footerTitle = 'Docsy',
		footerDescription = 'Your go-to resource for getting the most out of our platform.',
		footerColumns = [],
		socialLinks = [],
		copyrightText = '© 2024 Help Center. All rights reserved.'
	} = attributes;

	const defaultLogo = "<svg class='svg-inline--fa fa-headset' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='headset' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' data-fa-i2svg=''><path fill='currentColor' d='M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z'></path></svg>";

	let displayLogo = '';
	if (logo) {
	  if (typeof logo === 'string') {
	    displayLogo = logo;
	  } else if (logo.url) {
	    displayLogo = logo.url;
	  }
	}
	if (!displayLogo) {
	  displayLogo = defaultLogo;
	}

	const onSelectLogo = (media) => {
		setAttributes({ logo: media });
	};

	const onRemoveLogo = () => {
		setAttributes({ logo: null });
	};

	// Footer Columns Management
	const updateColumnTitle = (value, index) => {
		const newColumns = [...footerColumns];
		newColumns[index].title = value;
		setAttributes({ footerColumns: newColumns });
	};

	const updateColumnLink = (value, columnIndex, linkIndex) => {
		const newColumns = [...footerColumns];
		newColumns[columnIndex].links[linkIndex].text = value;
		setAttributes({ footerColumns: newColumns });
	};

	const updateColumnLinkUrl = (value, columnIndex, linkIndex) => {
		const newColumns = [...footerColumns];
		newColumns[columnIndex].links[linkIndex].url = value;
		setAttributes({ footerColumns: newColumns });
	};

	const addColumnLink = (columnIndex) => {
		const newColumns = [...footerColumns];
		newColumns[columnIndex].links.push({ text: '', url: '#' });
		setAttributes({ footerColumns: newColumns });
	};

	const removeColumnLink = (columnIndex, linkIndex) => {
		const newColumns = [...footerColumns];
		newColumns[columnIndex].links.splice(linkIndex, 1);
		setAttributes({ footerColumns: newColumns });
	};

	const addFooterColumn = () => {
		setAttributes({ 
			footerColumns: [...footerColumns, { 
				title: 'New Column', 
				links: [{ text: '', url: '#' }] 
			}] 
		});
	};

	const removeFooterColumn = (index) => {
		const newColumns = [...footerColumns];
		newColumns.splice(index, 1);
		setAttributes({ footerColumns: newColumns });
	};

	// Social Links Management
	const updateSocialLink = (value, index) => {
		const newSocialLinks = [...socialLinks];
		newSocialLinks[index].url = value;
		setAttributes({ socialLinks: newSocialLinks });
	};

	const updateSocialPlatform = (value, index) => {
		const newSocialLinks = [...socialLinks];
		newSocialLinks[index].platform = value;
		setAttributes({ socialLinks: newSocialLinks });
	};

	const onSelectSocialIcon = (media, index) => {
		const newSocialLinks = [...socialLinks];
		newSocialLinks[index].icon = media;
		setAttributes({ socialLinks: newSocialLinks });
	};

	const onRemoveSocialIcon = (index) => {
		const newSocialLinks = [...socialLinks];
		newSocialLinks[index].icon = null;
		setAttributes({ socialLinks: newSocialLinks });
	};

	const addSocialLink = () => {
		setAttributes({ 
			socialLinks: [...socialLinks, { platform: 'twitter', url: '#', icon: null }] 
		});
	};

	const removeSocialLink = (index) => {
		const newSocialLinks = [...socialLinks];
		newSocialLinks.splice(index, 1);
		setAttributes({ socialLinks: newSocialLinks });
	};

	const getSocialIcon = (platform, icon) => {
		if (icon && icon.url) {
			return <img src={icon.url} alt={icon.alt || platform} style={{ width: '16px', height: '16px' }} />;
		}
		
		const icons = {
			twitter: '📱',
			facebook: '📘',
			linkedin: '💼',
			instagram: '📷',
			youtube: '📺'
		};
		return icons[platform] || '🔗';
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Footer Settings', 'docsy')} initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectLogo}
							allowedTypes={['image']}
							value={logo ? logo.id : ''}
							render={({ open }) => (
								<div>
									<Button onClick={open} isSecondary>
										{logo ? __('Replace Logo', 'docsy') : __('Upload Logo', 'docsy')}
									</Button>
									{logo && (
										<div style={{ marginTop: '10px' }}>
											<img src={logo.url} alt={logo.alt || ''} style={{ maxWidth: '100%', height: 'auto' }} />
											<Button onClick={onRemoveLogo} isLink isDestructive>{__('Remove Logo', 'docsy')}</Button>
										</div>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>

				<PanelBody title={__('Footer Columns', 'docsy')} initialOpen={false}>
					{footerColumns.map((column, columnIndex) => (
						<div key={columnIndex} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
							<TextControl
								label={__('Column Title', 'docsy')}
								value={column.title}
								onChange={(value) => updateColumnTitle(value, columnIndex)}
							/>
							{column.links.map((link, linkIndex) => (
								<div key={linkIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
									<TextControl
										placeholder={__('Link text', 'docsy')}
										value={link.text}
										onChange={(value) => updateColumnLink(value, columnIndex, linkIndex)}
										style={{ flex: 1, marginRight: '8px' }}
									/>
									<TextControl
										placeholder={__('URL', 'docsy')}
										value={link.url}
										onChange={(value) => updateColumnLinkUrl(value, columnIndex, linkIndex)}
										style={{ flex: 1, marginRight: '8px' }}
									/>
									<IconButton
										icon="no-alt"
										label={__('Remove Link', 'docsy')}
										onClick={() => removeColumnLink(columnIndex, linkIndex)}
									/>
								</div>
							))}
							<Button isSecondary onClick={() => addColumnLink(columnIndex)} style={{ marginRight: '8px' }}>
								{__('Add Link', 'docsy')}
							</Button>
							<Button isDestructive onClick={() => removeFooterColumn(columnIndex)}>
								{__('Remove Column', 'docsy')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addFooterColumn}>{__('Add Column', 'docsy')}</Button>
				</PanelBody>

				<PanelBody title={__('Social Links', 'docsy')} initialOpen={false}>
					{socialLinks.map((social, index) => (
						<div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
							<div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
								<SelectControl
									value={social.platform}
									options={[
										{ label: 'Twitter', value: 'twitter' },
										{ label: 'Facebook', value: 'facebook' },
										{ label: 'LinkedIn', value: 'linkedin' },
										{ label: 'Instagram', value: 'instagram' },
										{ label: 'YouTube', value: 'youtube' }
									]}
									onChange={(value) => updateSocialPlatform(value, index)}
									style={{ width: '120px', marginRight: '8px' }}
								/>
								<TextControl
									placeholder={__('URL', 'docsy')}
									value={social.url}
									onChange={(value) => updateSocialLink(value, index)}
									style={{ flex: 1, marginRight: '8px' }}
								/>
								<IconButton
									icon="no-alt"
									label={__('Remove', 'docsy')}
									onClick={() => removeSocialLink(index)}
								/>
							</div>
							
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => onSelectSocialIcon(media, index)}
									allowedTypes={['image']}
									value={social.icon ? social.icon.id : ''}
									render={({ open }) => (
										<div>
											<Button onClick={open} isSecondary>
												{social.icon ? __('Replace Icon', 'docsy') : __('Upload Icon', 'docsy')}
											</Button>
											{social.icon && (
												<div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
													<img src={social.icon.url} alt={social.icon.alt || social.platform} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
													<Button onClick={() => onRemoveSocialIcon(index)} isLink isDestructive>{__('Remove Icon', 'docsy')}</Button>
												</div>
											)}
										</div>
									)}
								/>
							</MediaUploadCheck>
						</div>
					))}
					<Button isSecondary onClick={addSocialLink}>{__('Add Social Link', 'docsy')}</Button>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<div className="footer-container">
					<div className="footer-grid">
						<div id="footer-brand" className="footer-col">
							<div className="footer-brand-row">
								{logo && (
									<div className="logo-bg">
										{displayLogo.startsWith('<svg') ? (
										<div 
											className="logo-svg" 
											dangerouslySetInnerHTML={{ __html: displayLogo }}
											style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
										/>
									) : displayLogo.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
										<img src={displayLogo} alt="Logo" className="logo-img" style={{ width: 20, height: 20, objectFit: 'contain' }} />
									) : (
										<div 
											className="logo-svg" 
											dangerouslySetInnerHTML={{ __html: defaultLogo }}
											style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
										/>
									)}
									</div>
								)}
								<RichText
									tagName="span"
									value={footerTitle}
									onChange={(value) => setAttributes({ footerTitle: value })}
									className="footer-title"
									placeholder={__('Footer Title', 'docsy')}
								/>
							</div>
							<RichText
								tagName="p"
								value={footerDescription}
								onChange={(value) => setAttributes({ footerDescription: value })}
								className="footer-desc"
								placeholder={__('Footer description...', 'docsy')}
							/>
						</div>
						
						{footerColumns.map((column, columnIndex) => (
							<div key={columnIndex} className="footer-col">
								<RichText
									tagName="h3"
									value={column.title}
									onChange={(value) => updateColumnTitle(value, columnIndex)}
									className="footer-heading"
									placeholder={__('Column title...', 'docsy')}
								/>
								<ul className="footer-list">
									{column.links.map((link, linkIndex) => (
										<li key={linkIndex}>
											<RichText
												tagName="span"
												value={link.text}
												onChange={(value) => updateColumnLink(value, columnIndex, linkIndex)}
												className="footer-link"
												placeholder={__('Link text...', 'docsy')}
											/>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					
					<div className="footer-bottom">
						<RichText
							tagName="p"
							value={copyrightText}
							onChange={(value) => setAttributes({ copyrightText: value })}
							className="footer-copyright"
							placeholder={__('Copyright text...', 'docsy')}
						/>
						<div className="footer-socials">
							{socialLinks.map((social, index) => (
								<span key={index} className="footer-social-link">
									{getSocialIcon(social.platform, social.icon)}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
