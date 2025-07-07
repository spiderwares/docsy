/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, PlainText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
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
	const { title, subtitle, placeholder, showSearch = true } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Search Block Settings', 'docsy')} initialOpen={true}>
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
			</InspectorControls>
			<section id="hero-search" className="hero-search" {...useBlockProps()}>
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