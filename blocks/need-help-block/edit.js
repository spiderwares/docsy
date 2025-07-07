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
	const { heading, description, buttons = [] } = attributes;

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
			</InspectorControls>
			<section {...useBlockProps()} style={{ background: '#f9fafb', padding: '4rem 0' }}>
				<div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
					<h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>{heading}</h2>
					<p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>{description}</p>
					<div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
									borderRadius: '0.5rem',
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
