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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import {
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	Button,
	ColorPalette,
	ButtonGroup,
	TabPanel,
	SelectControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const DEFAULT_BUTTON = {
	text: 'Button',
	icon: '',
	url: '',
	bgColor: '#2563eb',
	textColor: '#fff',
	border: 'none',
	hoverBgColor: '#1d4ed8',
	hoverTextColor: '#fff',
	hoverBorder: 'none'
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { heading, description, buttons = [], backgroundColor, headingColor, descriptionColor, padding, borderRadius, boxShadow, textAlign, buttonGap, buttonBorderRadius } = attributes;

	const stylePresets = [
		{ name: 'Blue', color: '#2563EB' },
		{ name: 'White', color: '#fff' },
		{ name: 'Gray', color: '#6b7280' },
		{ name: 'Black', color: '#111827' },
		{ name: 'Green', color: '#059669' },
		{ name: 'Purple', color: '#7C3AED' },
	];

	const blockStyle = {
		'--nh-bg': backgroundColor,
		'--nh-heading': headingColor,
		'--nh-desc': descriptionColor,
		'--nh-padding': padding,
		'--nh-radius': borderRadius,
		'--nh-shadow': boxShadow,
		'--nh-align': textAlign,
		'--nh-button-gap': buttonGap,
		'--nh-button-radius': buttonBorderRadius,
	};

	const updateButton = (index, field, value) => {
		const newButtons = [...buttons];
		newButtons[index] = { ...newButtons[index], [field]: value };
		setAttributes({ buttons: newButtons });
	};

	const addButton = () => {
		setAttributes({ buttons: [...buttons, { ...DEFAULT_BUTTON }] });
	};

	const removeButton = (index) => {
		const newButtons = buttons.filter((_, i) => i !== index);
		setAttributes({ buttons: newButtons });
	};

	// Move button up
	const moveButtonUp = (index) => {
		if (index === 0) return; // Can't move first button up
		const newButtons = [...buttons];
		[newButtons[index], newButtons[index - 1]] = [newButtons[index - 1], newButtons[index]];
		setAttributes({ buttons: newButtons });
	};

	// Move button down
	const moveButtonDown = (index) => {
		if (index === buttons.length - 1) return; // Can't move last button down
		const newButtons = [...buttons];
		[newButtons[index], newButtons[index + 1]] = [newButtons[index + 1], newButtons[index]];
		setAttributes({ buttons: newButtons });
	};

	return (
		<>
			<InspectorControls>
				<TabPanel
					tabs={[
						{ name: 'content', title: 'Content' },
						{ name: 'style', title: 'Style' },
					]}
				>
					{(tab) => (
						<>
							{tab.name === 'content' && (
								<>
									<PanelBody title="Section Content" initialOpen={true}>
										<TextControl
											label="Heading"
											value={heading}
											onChange={(v) => setAttributes({ heading: v })}
										/>
										<TextareaControl
											label="Description"
											value={description}
											onChange={(v) => setAttributes({ description: v })}
										/>
									</PanelBody>
									<PanelBody title="Buttons" initialOpen={true}>
										{buttons.map((btn, i) => (
											<div key={i} style={{ 
												border: '1px solid #ddd', 
												borderRadius: '8px', 
												marginBottom: '1rem', 
												padding: '1rem',
												backgroundColor: '#f9f9f9'
											}}>
												{/* Button Header with Controls */}
												<div style={{ 
													display: 'flex', 
													justifyContent: 'space-between', 
													alignItems: 'center', 
													marginBottom: '1rem',
													paddingBottom: '0.5rem',
													borderBottom: '1px solid #eee'
												}}>
													<h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
														Button #{i + 1} - {btn.text || 'Untitled Button'}
													</h4>
													<ButtonGroup>
														<Button
															isSmall
															icon="arrow-up-alt2"
															label="Move Button Up"
															onClick={() => moveButtonUp(i)}
															disabled={i === 0}
														/>
														<Button
															isSmall
															icon="arrow-down-alt2"
															label="Move Button Down"
															onClick={() => moveButtonDown(i)}
															disabled={i === (buttons.length - 1)}
														/>
														<Button
															isSmall
															isDestructive
															icon="trash"
															label="Remove Button"
															onClick={() => removeButton(i)}
														/>
													</ButtonGroup>
												</div>
												<TextControl
													label="Button Text"
													value={btn.text}
													onChange={(v) => updateButton(i, 'text', v)}
												/>
												<TextControl
													label="Icon SVG (optional)"
													value={btn.icon}
													onChange={(v) => updateButton(i, 'icon', v)}
													help="Paste SVG markup for the icon."
												/>
												<TextControl
													label="Button URL"
													value={btn.url}
													onChange={(v) => updateButton(i, 'url', v)}
												/>
												<PanelBody title="Button CSS Controls" initialOpen={false}>
													<PanelRow>
														<span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Normal State</span>
													</PanelRow>
													<ColorPalette
														label="Background Color"
														value={btn.bgColor}
														onChange={(v) => updateButton(i, 'bgColor', v)}
													/>
													<ColorPalette
														label="Text Color"
														value={btn.textColor}
														onChange={(v) => updateButton(i, 'textColor', v)}
													/>
													<TextControl
														label="Border (CSS)"
														value={btn.border}
														onChange={(v) => updateButton(i, 'border', v)}
													/>
													<PanelRow>
														<span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Hover State</span>
													</PanelRow>
													<ColorPalette
														label="Hover Background Color"
														value={btn.hoverBgColor}
														onChange={(v) => updateButton(i, 'hoverBgColor', v)}
													/>
													<ColorPalette
														label="Hover Text Color"
														value={btn.hoverTextColor}
														onChange={(v) => updateButton(i, 'hoverTextColor', v)}
													/>
													<TextControl
														label="Hover Border (CSS)"
														value={btn.hoverBorder}
														onChange={(v) => updateButton(i, 'hoverBorder', v)}
													/>
												</PanelBody>
											</div>
										))}
										<Button isPrimary onClick={addButton} style={{ width: '100%' }}>
											Add New Button
										</Button>
									</PanelBody>
								</>
							)}
							{tab.name === 'style' && (
								<>
									<PanelBody title="Block Style" initialOpen={true}>
										<ColorPalette
											colors={stylePresets}
											value={backgroundColor}
											onChange={(color) => setAttributes({ backgroundColor: color })}
										/>
										<TextControl
											label="Padding"
											value={padding}
											onChange={(value) => setAttributes({ padding: value })}
											placeholder="4rem 0"
										/>
										<TextControl
											label="Border Radius"
											value={borderRadius}
											onChange={(value) => setAttributes({ borderRadius: value })}
											placeholder="0px"
										/>
										<TextControl
											label="Box Shadow"
											value={boxShadow}
											onChange={(value) => setAttributes({ boxShadow: value })}
											placeholder="none"
										/>
										<SelectControl
											label="Text Align"
											value={textAlign}
											onChange={(value) => setAttributes({ textAlign: value })}
											options={[
												{ label: 'Left', value: 'left' },
												{ label: 'Center', value: 'center' },
												{ label: 'Right', value: 'right' },
											]}
										/>
										<TextControl
											label="Button Gap"
											value={buttonGap}
											onChange={(value) => setAttributes({ buttonGap: value })}
											placeholder="1rem"
										/>
										<TextControl
											label="Button Border Radius"
											value={buttonBorderRadius}
											onChange={(value) => setAttributes({ buttonBorderRadius: value })}
											placeholder="0.5rem"
										/>
									</PanelBody>
									<PanelBody title="Heading Style" initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={headingColor}
											onChange={(color) => setAttributes({ headingColor: color })}
										/>
									</PanelBody>
									<PanelBody title="Description Style" initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={descriptionColor}
											onChange={(color) => setAttributes({ descriptionColor: color })}
										/>
									</PanelBody>
								</>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>
			<section {...useBlockProps({ style: blockStyle })}>
				<div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
					<h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--nh-heading)', marginBottom: '1rem' }}>{heading}</h2>
					<p style={{ fontSize: '1.125rem', color: 'var(--nh-desc)', marginBottom: '2rem' }}>{description}</p>
					<div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--nh-button-gap)', justifyContent: 'center', flexWrap: 'wrap' }}>
						{buttons.map((btn, i) => (
							<a
								key={i}
								href={btn.url}
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									background: btn.bgColor,
									color: btn.textColor,
									border: btn.border,
									padding: '0.75rem 2rem',
									borderRadius: 'var(--nh-button-radius)',
									fontWeight: 600,
									transition: 'all 0.2s',
									cursor: 'pointer',
									textDecoration: 'none',
									position: 'relative'
								}}
								onMouseOver={e => {
									e.currentTarget.style.background = btn.hoverBgColor;
									e.currentTarget.style.color = btn.hoverTextColor;
									e.currentTarget.style.border = btn.hoverBorder;
								}}
								onMouseOut={e => {
									e.currentTarget.style.background = btn.bgColor;
									e.currentTarget.style.color = btn.textColor;
									e.currentTarget.style.border = btn.border;
								}}
							>
								{btn.icon && (
									<svg
										className="button-icon"
										style={{ marginRight: 8, display: 'inline-flex', alignItems: 'center' }}
										dangerouslySetInnerHTML={{ __html: btn.icon }}
									/>
								)}
								{btn.text}
							</a>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
