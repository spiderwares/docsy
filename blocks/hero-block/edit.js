/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, PlainText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, ColorPalette, RangeControl, SelectControl, TabPanel } from '@wordpress/components';
import { useState } from 'react';

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
	const { title, subtitle, placeholder, showSearch = true, backgroundColor, titleColor, subtitleColor, padding, borderRadius, boxShadow, textAlign, searchInputBg } = attributes;

	const stylePresets = [
		{ name: 'Blue', color: '#1d4ed8' },
		{ name: 'White', color: '#fff' },
		{ name: 'Light Blue', color: '#c7d2fe' },
		{ name: 'Gray', color: '#f3f4f6' },
		{ name: 'Black', color: '#222' },
	];

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
								<PanelBody title={__('Hero Content', 'docsy')} initialOpen={true}>
									<TextControl
										label={__('Title', 'docsy')}
										value={title}
										onChange={(value) => setAttributes({ title: value })}
										placeholder={__('How can we help you?', 'docsy')}
									/>
									<TextControl
										label={__('Subtitle', 'docsy')}
										value={subtitle}
										onChange={(value) => setAttributes({ subtitle: value })}
										placeholder={__('Search our knowledge base for answers', 'docsy')}
									/>
									<ToggleControl
										label={__('Display Search Input', 'docsy')}
										checked={showSearch}
										onChange={() => setAttributes({ showSearch: !showSearch })}
									/>
									{showSearch && (
										<TextControl
											label={__('Placeholder', 'docsy')}
											value={placeholder}
											onChange={(value) => setAttributes({ placeholder: value })}
											placeholder={__('Search for articles...', 'docsy')}
										/>
									)}
								</PanelBody>
							)}
							{tab.name === 'style' && (
								<>
									<PanelBody title={__('Hero Background', 'docsy')} initialOpen={true}>
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
									<PanelBody title={__('Subtitle Style', 'docsy')} initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={subtitleColor}
											onChange={(color) => setAttributes({ subtitleColor: color })}
										/>
									</PanelBody>
									<PanelBody title={__('Layout & Box', 'docsy')} initialOpen={false}>
										<TextControl
											label={__('Padding', 'docsy')}
											value={padding}
											onChange={(value) => setAttributes({ padding: value })}
											placeholder="4rem 1rem"
										/>
										<TextControl
											label={__('Border Radius', 'docsy')}
											value={borderRadius}
											onChange={(value) => setAttributes({ borderRadius: value })}
											placeholder="0px"
										/>
										<TextControl
											label={__('Box Shadow', 'docsy')}
											value={boxShadow}
											onChange={(value) => setAttributes({ boxShadow: value })}
											placeholder="none"
										/>
										<SelectControl
											label={__('Text Align', 'docsy')}
											value={textAlign}
											onChange={(value) => setAttributes({ textAlign: value })}
											options={[
												{ label: __('Left', 'docsy'), value: 'left' },
												{ label: __('Center', 'docsy'), value: 'center' },
												{ label: __('Right', 'docsy'), value: 'right' },
											]}
										/>
									</PanelBody>
									<PanelBody title={__('Search Input Style', 'docsy')} initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={searchInputBg}
											onChange={(color) => setAttributes({ searchInputBg: color })}
										/>
									</PanelBody>
								</>
							)}
					</>
				)}
				</TabPanel>
			</InspectorControls>
			<section id="hero-search" className="hero-search" {...useBlockProps({ style: heroStyle })}>
				<div className="container text-center">
					<RichText
						tagName="h1"
						className="hero-title"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('How can we help you?', 'docsy')}
						allowedFormats={[]}
					/>
					<RichText
						tagName="p"
						className="hero-subtitle"
						value={subtitle}
						onChange={(value) => setAttributes({ subtitle: value })}
						placeholder={__('Search our knowledge base for answers', 'docsy')}
						allowedFormats={[]}
					/>
					{showSearch && (
						<div className="search-wrapper">
							<div className="search-box">
								<PlainText
									className="search-input"
									value=""
									placeholder={placeholder}
									onChange={() => {}}
									aria-label={__('Search input', 'docsy')}
									disabled
									style={{ background: 'var(--hero-search-bg)' }}
								/>
								<PlainText
									className="search-placeholder-input"
									value={placeholder}
									onChange={(value) => setAttributes({ placeholder: value })}
									placeholder={__('Search for articles...', 'docsy')}
									aria-label={__('Search placeholder', 'docsy')}
								/>
								<button className="search-button" tabIndex={-1} aria-hidden="true">
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
		</>
	);
}