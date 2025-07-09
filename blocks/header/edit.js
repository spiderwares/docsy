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
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Button, TextControl, SelectControl, Notice, TabPanel, ColorPalette, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

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
 * This block automatically detects and loads menu items from a WordPress menu
 * named "Header" if available. Users can also select other menus or use custom
 * menu items.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { siteTitle, showLogo, selectedMenuId, menuItems, preferredMenuName, logoUrl, backgroundColor, titleColor, menuColor, menuHoverColor, padding, borderRadius, boxShadow } = attributes;
	
	// Default logo SVG from block.json
	const defaultLogo = "<svg class='svg-inline--fa fa-headset' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='headset' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' data-fa-i2svg=''><path fill='currentColor' d='M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z'></path></svg>";
	
	// Use logoUrl if it exists and is valid, otherwise use default
	const displayLogo = logoUrl || defaultLogo;

	// Fetch available menus
	const menus = useSelect((select) => {
		return select('core').getEntityRecords('taxonomy', 'nav_menu', {
			per_page: -1,
		});
	}, []);

	// State for menu refresh
	const [menuRefreshKey, setMenuRefreshKey] = useState(0);

	// Fetch menu items for the selected menu
	const selectedMenuItems = useSelect((select) => {
		if (!selectedMenuId) return [];
		return select('core').getEntityRecords('postType', 'nav_menu_item', {
			menu: selectedMenuId,
			per_page: -1,
		});
	}, [selectedMenuId]);

	// Auto-select preferred menu if available and no menu is currently selected
	useEffect(() => {
		if (menus && !selectedMenuId) {
			const preferredMenu = menus.find(menu => menu.name === preferredMenuName);
			if (preferredMenu) {
				setAttributes({ selectedMenuId: preferredMenu.id });
			}
		}
	}, [menus, selectedMenuId, setAttributes, preferredMenuName]);

	const updateSiteTitle = (newTitle) => {
		setAttributes({ siteTitle: newTitle });
	};

	const toggleLogo = () => {
		setAttributes({ showLogo: !showLogo });
	};

	const updateSelectedMenu = (menuId) => {
		setAttributes({ selectedMenuId: parseInt(menuId) || 0 });
	};

	const updateMenuItem = (index, field, value) => {
		const newMenuItems = [...menuItems];
		newMenuItems[index] = { ...newMenuItems[index], [field]: value };
		setAttributes({ menuItems: newMenuItems });
	};

	const addMenuItem = () => {
		const newMenuItems = [...menuItems, { text: 'New Menu Item', url: '#' }];
		setAttributes({ menuItems: newMenuItems });
	};

	const removeMenuItem = (index) => {
		const newMenuItems = menuItems.filter((_, i) => i !== index);
		setAttributes({ menuItems: newMenuItems });
	};

	const onSelectLogo = (media) => {
		setAttributes({ logoUrl: media?.url || '' });
	};

	// Prepare menu options for the select control
	const menuOptions = menus ? [
		{ label: __('Select a menu...', 'docsy'), value: 0 },
		...menus.map(menu => ({
			label: `${menu.name} (${menu.count} items)`,
			value: menu.id
		}))
	] : [{ label: __('Loading menus...', 'docsy'), value: 0 }];

	// Get current selected menu info
	const selectedMenuInfo = menus ? menus.find(menu => menu.id === selectedMenuId) : null;

	// Determine which menu items to display
	const displayMenuItems = selectedMenuId && selectedMenuItems ? selectedMenuItems : menuItems;

	const stylePresets = useMemo(() => ([
		{ name: 'White', color: '#ffffff' },
		{ name: 'Light Gray', color: '#f8f9fa' },
		{ name: 'Blue', color: '#007cba' },
		{ name: 'Black', color: '#222' },
	]), []);

	const headerStyle = {
		'--header-bg': backgroundColor,
		'--header-title-color': titleColor,
		'--header-menu-color': menuColor,
		'--header-menu-hover-color': menuHoverColor,
		'--header-padding': padding,
		'--header-radius': borderRadius,
		'--header-box-shadow': boxShadow,
	};

	return (
		<>
			<InspectorControls>
				<TabPanel
					tabs={[
						{ name: 'content', title: __('Content', 'docsy') },
						{ name: 'style', title: __('Style', 'docsy') },
					]}
				>
					{(tab) => (
						<>
							{tab.name === 'content' && (
								<>
									<PanelBody title={__('Header Content', 'docsy')} initialOpen={true}>
										<ToggleControl
											label={__('Show Logo', 'docsy')}
											checked={showLogo}
											onChange={toggleLogo}
										/>
										<TextControl
											label={__('Site Title', 'docsy')}
											value={siteTitle}
											onChange={updateSiteTitle}
										/>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={onSelectLogo}
												allowedTypes={['image']}
												value={logoUrl}
												render={({ open }) => (
													<Button onClick={open} variant="secondary" style={{ marginTop: '10px' }}>
														{logoUrl ? __('Change Logo', 'docsy') : __('Upload Logo', 'docsy')}
													</Button>
												)}
											/>
											{logoUrl && (
												<Button onClick={() => setAttributes({ logoUrl: '' })} isDestructive variant="secondary" style={{ marginLeft: '10px' }}>
													{__('Remove Logo', 'docsy')}
												</Button>
											)}
										</MediaUploadCheck>
									</PanelBody>
									<PanelBody title={__('Navigation Menu', 'docsy')} initialOpen={false}>
										{!menus && (
											<Notice status="warning" isDismissible={false}>
												{__('Loading available menus...', 'docsy')}
											</Notice>
										)}
										
										{menus && menus.length === 0 && (
											<Notice status="warning" isDismissible={false}>
												{__('No menus found. Create a menu in Appearance > Menus first.', 'docsy')}
												<br/>
												<a href="/wp-admin/nav-menus.php" target="_blank" rel="noopener noreferrer">
													{__('Go to Menu Management', 'docsy')}
												</a>
											</Notice>
										)}
										
										{menus && menus.length > 0 && (
											<>
												<SelectControl
													label={__('Select Menu', 'docsy')}
													value={selectedMenuId}
													options={menuOptions}
													onChange={updateSelectedMenu}
													help={__('Choose a WordPress menu to display dynamically.', 'docsy')}
												/>
												
												{selectedMenuInfo && (
													<div style={{ 
														marginTop: '10px', 
														padding: '10px', 
														background: '#f0f0f0', 
														borderRadius: '4px',
														fontSize: '13px'
													}}>
														<strong>{__('Selected Menu:', 'docsy')}</strong> {selectedMenuInfo.name}<br/>
														{__('Items:', 'docsy')} {selectedMenuInfo.count}<br/>
														{__('Menu ID:', 'docsy')} {selectedMenuInfo.id}
													</div>
												)}
												
												<div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
													{selectedMenuId && (
														<Button
															variant="secondary"
															onClick={() => setAttributes({ selectedMenuId: 0 })}
														>
															{__('Clear Selection', 'docsy')}
														</Button>
													)}
													<Button
														variant="secondary"
														onClick={() => setMenuRefreshKey(prev => prev + 1)}
														style={{ marginLeft: 'auto' }}
													>
														{__('Refresh Menus', 'docsy')}
													</Button>
												</div>
											</>
										)}
									</PanelBody>
									{!selectedMenuId && (
										<PanelBody title={__('Custom Menu Items', 'docsy')} initialOpen={false}>
											<Notice status="info" isDismissible={false}>
												{__('No dynamic menu selected. Add custom menu items below or select a WordPress menu above.', 'docsy')}
											</Notice>
											{menuItems.map((item, index) => (
												<div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
													<TextControl
														label={__('Menu Text', 'docsy')}
														value={item.text}
														onChange={(value) => updateMenuItem(index, 'text', value)}
													/>
													<TextControl
														label={__('URL', 'docsy')}
														value={item.url}
														onChange={(value) => updateMenuItem(index, 'url', value)}
													/>
													<Button
														isDestructive
														variant="secondary"
														onClick={() => removeMenuItem(index)}
														style={{ marginTop: '5px' }}
													>
														{__('Remove', 'docsy')}
													</Button>
												</div>
											))}
											<Button
												variant="secondary"
												onClick={addMenuItem}
												style={{ marginTop: '10px' }}
											>
												{__('Add Menu Item', 'docsy')}
											</Button>
										</PanelBody>
									)}
								</>
							)}
							{tab.name === 'style' && (
								<>
									<PanelBody title={__('Header Background', 'docsy')} initialOpen={true}>
										<ColorPalette
											colors={stylePresets}
											value={backgroundColor}
											onChange={(color) => setAttributes({ backgroundColor: color })}
										/>
									</PanelBody>
									<PanelBody title={__('Title Style', 'docsy')} initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={titleColor}
											onChange={(color) => setAttributes({ titleColor: color })}
										/>
									</PanelBody>
									<PanelBody title={__('Menu Style', 'docsy')} initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={menuColor}
											onChange={(color) => setAttributes({ menuColor: color })}
										/>
										<ColorPalette
											colors={stylePresets}
											value={menuHoverColor}
											onChange={(color) => setAttributes({ menuHoverColor: color })}
										/>
									</PanelBody>
									<PanelBody title={__('Spacing & Border', 'docsy')} initialOpen={false}>
										<BoxControl
											label={__('Padding', 'docsy')}
											values={{ top: '', right: '', bottom: '', left: '' }}
											value={padding}
											onChange={(value) => setAttributes({ padding: value })}
										/>
										<TextControl
											label={__('Border Radius', 'docsy')}
											value={borderRadius}
											onChange={(value) => setAttributes({ borderRadius: value })}
										/>
										<TextControl
											label={__('Box Shadow', 'docsy')}
											value={boxShadow}
											onChange={(value) => setAttributes({ boxShadow: value })}
										/>
									</PanelBody>
								</>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>

			<header { ...useBlockProps({ style: headerStyle }) } className="header">
				<div className="header-container">
					<div className="header-inner">
						<div className="header-left">
							{showLogo && (
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
							<div>
								<RichText
									tagName="h1"
									className="site-title"
									value={siteTitle}
									onChange={updateSiteTitle}
									placeholder={__('Enter site title...', 'docsy')}
								/>
							</div>
						</div>
						<nav className="header-nav">
							{selectedMenuId && selectedMenuItems ? (
								<>
									{selectedMenuItems.map((item, index) => (
										<a key={index} href={item.url} className="nav-link">
											{item.title?.rendered || item.title || 'Menu Item'}
										</a>
									))}
									{selectedMenuInfo && (
										<div style={{ 
											fontSize: '11px', 
											color: '#007cba', 
											marginTop: '8px', 
											padding: '4px 8px',
											background: 'rgba(0, 124, 186, 0.1)',
											borderRadius: '3px',
											border: '1px solid rgba(0, 124, 186, 0.2)'
										}}>
											<strong>✓</strong> {__('Dynamic menu:', 'docsy')} {selectedMenuInfo.name} ({selectedMenuItems.length} items)
										</div>
									)}
								</>
							) : (
								<>
									{displayMenuItems.map((item, index) => (
										<a key={index} href={item.url} className="nav-link">
											{item.text}
										</a>
									))}
									{!selectedMenuId && (
										<div style={{ 
											fontSize: '11px', 
											color: '#666', 
											marginTop: '8px', 
											padding: '4px 8px',
											background: '#f5f5f5',
											borderRadius: '3px',
											border: '1px solid #ddd'
										}}>
											{__('Custom menu items', 'docsy')} ({displayMenuItems.length} items)
										</div>
									)}
								</>
							)}
						</nav>
					</div>
				</div>
			</header>
		</>
	);
}
