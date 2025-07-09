/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, IconButton, RangeControl, ButtonGroup, TabPanel, ColorPalette, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

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
		cards = DEFAULT_CARDS,
		title = 'Response Times',
		subtitle = "Here's what you can expect when contacting us",
		align = 'center',
		backgroundColor = '#fff',
		titleColor = '#111827',
		subtitleColor = '#666',
		padding = '32px 0',
		borderRadius = '12px',
		boxShadow = '0 2px 8px rgba(0,0,0,0.04)',
		textAlign = 'center',
		cardGap = '24px',
		valueFontSize = 30,
		labelFontSize = 16,
		descFontSize = 14,
	} = attributes;

	const blockStyle = {
		'--rtc-bg': backgroundColor,
		'--rtc-title': titleColor,
		'--rtc-subtitle': subtitleColor,
		'--rtc-padding': padding,
		'--rtc-radius': borderRadius,
		'--rtc-shadow': boxShadow,
		'--rtc-align': textAlign,
		'--rtc-card-gap': cardGap,
	};

	const updateCard = (idx, key, value) => {
		const newCards = [...cards];
		newCards[idx] = { ...newCards[idx], [key]: value };
		setAttributes({ cards: newCards });
	};

	const addCard = () => {
		setAttributes({
			cards: [
				...cards,
				{
					value: '',
					label: '',
					desc: '',
					color: '#000',
					borderColor: '#000',
					textColor: '#000',
					bgColor: '#fff',
					valueSize: 24,
					labelSize: 16,
					descSize: 14,
				},
			],
		});
	};

	const removeCard = (idx) => {
		const newCards = cards.filter((_, i) => i !== idx);
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

	const setAlign = (newAlign) => setAttributes({ align: newAlign });

	return (
		<Fragment>
			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={val => setAttributes({ align: val })}
				/>
			</BlockControls>
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
									<PanelBody title='Section Content' initialOpen={true}>
										<TextControl
											label='Title'
											value={title}
											onChange={val => setAttributes({ title: val })}
										/>
										<TextControl
											label='Subtitle'
											value={subtitle}
											onChange={val => setAttributes({ subtitle: val })}
										/>
									</PanelBody>
									<PanelBody title='Cards' initialOpen={true}>
										{cards.map((card, idx) => (
											<div key={idx} style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9f9f9' }}>
												{/* Card Header with Controls */}
												<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #eee' }}>
													<h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
														Card #{idx + 1} - {card.label || 'Untitled Card'}
													</h4>
													<ButtonGroup>
														<Button isSmall icon='arrow-up-alt2' label='Move Card Up' onClick={() => moveCardUp(idx)} disabled={idx === 0} />
														<Button isSmall icon='arrow-down-alt2' label='Move Card Down' onClick={() => moveCardDown(idx)} disabled={idx === (cards.length - 1)} />
														<Button isSmall isDestructive icon='trash' label='Remove Card' onClick={() => removeCard(idx)} />
													</ButtonGroup>
												</div>
												<TextControl label='Value' value={card.value} onChange={val => updateCard(idx, 'value', val)} />
												<TextControl label='Label' value={card.label} onChange={val => updateCard(idx, 'label', val)} />
												<TextControl label='Description' value={card.desc} onChange={val => updateCard(idx, 'desc', val)} />
											</div>
										))}
										<Button isPrimary onClick={addCard} style={{ width: '100%' }}>
											Add New Card
										</Button>
									</PanelBody>
								</>
							)}
							{tab.name === 'style' && (
								<>
									<PanelBody title='Block Style' initialOpen={true}>
										<ColorPalette
											label='Background Color'
											value={backgroundColor}
											onChange={color => setAttributes({ backgroundColor: color })}
										/>
										<TextControl
											label='Padding'
											value={padding}
											onChange={val => setAttributes({ padding: val })}
											placeholder='32px 0'
										/>
										<TextControl
											label='Border Radius'
											value={borderRadius}
											onChange={val => setAttributes({ borderRadius: val })}
											placeholder='12px'
										/>
										<TextControl
											label='Box Shadow'
											value={boxShadow}
											onChange={val => setAttributes({ boxShadow: val })}
											placeholder='0 2px 8px rgba(0,0,0,0.04)'
										/>
										<SelectControl
											label='Text Align'
											value={textAlign}
											onChange={val => setAttributes({ textAlign: val })}
											options={[
												{ label: 'Left', value: 'left' },
												{ label: 'Center', value: 'center' },
												{ label: 'Right', value: 'right' },
											]}
										/>
										<TextControl
											label='Card Gap'
											value={cardGap}
											onChange={val => setAttributes({ cardGap: val })}
											placeholder='24px'
										/>
									</PanelBody>
									<PanelBody title='Font Sizes' initialOpen={false}>
										<RangeControl
											label='Value Font Size'
											value={valueFontSize}
											onChange={val => setAttributes({ valueFontSize: val })}
											min={12}
											max={48}
										/>
										<RangeControl
											label='Label Font Size'
											value={labelFontSize}
											onChange={val => setAttributes({ labelFontSize: val })}
											min={10}
											max={32}
										/>
										<RangeControl
											label='Description Font Size'
											value={descFontSize}
											onChange={val => setAttributes({ descFontSize: val })}
											min={10}
											max={28}
										/>
									</PanelBody>
									<PanelBody title='Title Style' initialOpen={false}>
										<ColorPalette
											label='Title Color'
											value={titleColor}
											onChange={color => setAttributes({ titleColor: color })}
										/>
									</PanelBody>
									<PanelBody title='Subtitle Style' initialOpen={false}>
										<ColorPalette
											label='Subtitle Color'
											value={subtitleColor}
											onChange={color => setAttributes({ subtitleColor: color })}
										/>
									</PanelBody>
								</>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>
			<section {...useBlockProps({ style: blockStyle })}>
				<div className="response-time-container">
					<div className="response-time-header" style={{ textAlign: textAlign }}>
						<h2 className="response-time-title" style={{ color: 'var(--rtc-title)' }}>{title}</h2>
						<p className="response-time-subtitle" style={{ color: 'var(--rtc-subtitle)' }}>{subtitle}</p>
					</div>
					<div
						className="response-time-grid"
						style={{
							gap: 'var(--rtc-card-gap)',
							justifyContent:
								textAlign === 'center'
									? 'center'
									: textAlign === 'right'
									? 'flex-end'
									: 'flex-start',
						}}
					>
						{cards.map((card, idx) => (
							<div
								key={idx}
								className="response-card"
								style={{
									borderLeft: `4px solid ${card.borderColor}`,
									background: card.bgColor,
									color: card.textColor,
									textAlign: textAlign,
									borderRadius: 'var(--rtc-radius)',
									boxShadow: 'var(--rtc-shadow)',
								}}
							>
								<div
									className="response-time-value"
									style={{
										color: card.textColor,
										fontSize: valueFontSize,
										fontWeight: 'bold',
									}}
								>
									{card.value}
								</div>
								<div
									className="response-time-label"
									style={{
										fontSize: labelFontSize,
									}}
								>
									{card.label}
								</div>
								<div
									className="response-time-desc"
									style={{
										fontSize: descFontSize,
									}}
								>
									{card.desc}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</Fragment>
	);
}
