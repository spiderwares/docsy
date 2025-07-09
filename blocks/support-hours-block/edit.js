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
import { PanelBody, TextControl, Button, __experimentalInputControl as InputControl, ButtonGroup, TabPanel, ColorPalette, SelectControl } from '@wordpress/components';
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
	const { title, subtitle, cards, backgroundColor, cardBackgroundColor, textColor, titleColor, subtitleColor, padding, borderRadius, boxShadow, textAlign, cardGap } = attributes;

	const blockStyle = {
		'--sh-bg': backgroundColor,
		'--sh-card-bg': cardBackgroundColor,
		'--sh-text': textColor,
		'--sh-title': titleColor,
		'--sh-subtitle': subtitleColor,
		'--sh-padding': padding,
		'--sh-radius': borderRadius,
		'--sh-shadow': boxShadow,
		'--sh-align': textAlign,
		'--sh-card-gap': cardGap,
	};

	// Card-level repeater
	const updateCard = (index, field, value) => {
		const newCards = [...cards];
		newCards[index][field] = value;
		setAttributes({ cards: newCards });
	};
	const addCard = () => {
		setAttributes({ cards: [...cards, { title: '', rows: [] }] });
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

	// Row-level repeater for each card
	const updateRow = (cardIdx, rowIdx, field, value) => {
		const newCards = [...cards];
		const newRows = [...(newCards[cardIdx].rows || [])];
		newRows[rowIdx][field] = value;
		newCards[cardIdx].rows = newRows;
		setAttributes({ cards: newCards });
	};
	const addRow = (cardIdx) => {
		const newCards = [...cards];
		newCards[cardIdx].rows = [...(newCards[cardIdx].rows || []), { label: '', hours: '' }];
		setAttributes({ cards: newCards });
	};
	const removeRow = (cardIdx, rowIdx) => {
		const newCards = [...cards];
		newCards[cardIdx].rows = newCards[cardIdx].rows.filter((_, i) => i !== rowIdx);
		setAttributes({ cards: newCards });
	};
	
	// Move row up
	const moveRowUp = (cardIdx, rowIdx) => {
		if (rowIdx === 0) return; // Can't move first row up
		const newCards = [...cards];
		const rows = [...(newCards[cardIdx].rows || [])];
		[rows[rowIdx], rows[rowIdx - 1]] = [rows[rowIdx - 1], rows[rowIdx]];
		newCards[cardIdx].rows = rows;
		setAttributes({ cards: newCards });
	};

	// Move row down
	const moveRowDown = (cardIdx, rowIdx) => {
		const newCards = [...cards];
		const rows = [...(newCards[cardIdx].rows || [])];
		if (rowIdx === rows.length - 1) return; // Can't move last row down
		[rows[rowIdx], rows[rowIdx + 1]] = [rows[rowIdx + 1], rows[rowIdx]];
		newCards[cardIdx].rows = rows;
		setAttributes({ cards: newCards });
	};

	return (
		<Fragment>
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
									<PanelBody title='Support Hours Settings' initialOpen={true}>
										<TextControl
											label='Title'
											value={title}
											onChange={(val) => setAttributes({ title: val })}
										/>
										<TextControl
											label='Subtitle'
											value={subtitle}
											onChange={(val) => setAttributes({ subtitle: val })}
										/>
									</PanelBody>
									<PanelBody title='Cards' initialOpen={false}>
										{cards.map((card, cardIdx) => (
											<div key={cardIdx} style={{ 
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
														Card #{cardIdx + 1} - {card.title || 'Untitled Card'}
													</h4>
													<ButtonGroup>
														<Button
															isSmall
															icon='arrow-up-alt2'
															label='Move Card Up'
															onClick={() => moveCardUp(cardIdx)}
															disabled={cardIdx === 0}
														/>
														<Button
															isSmall
															icon='arrow-down-alt2'
															label='Move Card Down'
															onClick={() => moveCardDown(cardIdx)}
															disabled={cardIdx === (cards.length - 1)}
														/>
														<Button
															isSmall
															isDestructive
															icon='trash'
															label='Remove Card'
															onClick={() => removeCard(cardIdx)}
														/>
													</ButtonGroup>
												</div>
												<TextControl
													label='Card Title'
													value={card.title}
													onChange={(val) => updateCard(cardIdx, 'title', val)}
												/>
												<div style={{ fontWeight: 'bold', margin: '1rem 0 0.5rem 0' }}>Rows</div>
												{(card.rows || []).map((row, rowIdx) => (
													<div key={rowIdx} style={{ 
														marginBottom: '0.5em', 
														border: '1px solid #eee', 
														borderRadius: '4px',
														padding: '0.5em',
														backgroundColor: '#fff'
													}}>
														{/* Row Header with Controls */}
														<div style={{ 
															display: 'flex', 
															justifyContent: 'space-between', 
															alignItems: 'center', 
															marginBottom: '0.5rem',
															paddingBottom: '0.25rem',
															borderBottom: '1px solid #f0f0f0'
														}}>
															<span style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>
																Row #{rowIdx + 1}
															</span>
															<ButtonGroup>
																<Button
																	isSmall
																	icon='arrow-up-alt2'
																	label='Move Row Up'
																	onClick={() => moveRowUp(cardIdx, rowIdx)}
																	disabled={rowIdx === 0}
																/>
																<Button
																	isSmall
																	icon='arrow-down-alt2'
																	label='Move Row Down'
																	onClick={() => moveRowDown(cardIdx, rowIdx)}
																	disabled={rowIdx === (card.rows.length - 1)}
																/>
																<Button
																	isSmall
																	isDestructive
																	icon='trash'
																	label='Remove Row'
																	onClick={() => removeRow(cardIdx, rowIdx)}
																/>
															</ButtonGroup>
														</div>
														<InputControl
															label='Label'
															value={row.label}
															onChange={(val) => updateRow(cardIdx, rowIdx, 'label', val)}
														/>
														<InputControl
															label='Hours'
															value={row.hours}
															onChange={(val) => updateRow(cardIdx, rowIdx, 'hours', val)}
														/>
													</div>
												))}
												<Button isPrimary onClick={() => addRow(cardIdx)} style={{ width: '100%', marginTop: '0.5rem' }}>
													Add Row
												</Button>
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
										<ColorPalette
											label='Card Background Color'
											value={cardBackgroundColor}
											onChange={color => setAttributes({ cardBackgroundColor: color })}
										/>
										<ColorPalette
											label='Text Color'
											value={textColor}
											onChange={color => setAttributes({ textColor: color })}
										/>
										<TextControl
											label='Padding'
											value={padding}
											onChange={val => setAttributes({ padding: val })}
											placeholder='4rem 0 5rem 0'
										/>
										<TextControl
											label='Border Radius'
											value={borderRadius}
											onChange={val => setAttributes({ borderRadius: val })}
											placeholder='1rem'
										/>
										<TextControl
											label='Box Shadow'
											value={boxShadow}
											onChange={val => setAttributes({ boxShadow: val })}
											placeholder='none'
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
											placeholder='2rem'
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
			<section id="support-hours" {...useBlockProps({ style: blockStyle })}>
				<div className="support-hours-container">
					<div className="support-hours-card">
						<h2 className="support-hours-title" style={{ color: 'var(--sh-title)' }}>{title}</h2>
						<p className="support-hours-subtitle" style={{ color: 'var(--sh-subtitle)' }}>{subtitle}</p>
						<div className="support-hours-grid" style={{ gap: 'var(--sh-card-gap)', textAlign: textAlign }}>
							{cards.map((card, cardIdx) => (
								<div key={cardIdx} id={card.title ? card.title.toLowerCase().replace(/\s+/g, '-') : undefined} style={{ background: 'var(--sh-card-bg)', color: 'var(--sh-text)', borderRadius: 'var(--sh-radius)', boxShadow: 'var(--sh-shadow)' }}>
									<h3 className="support-hours-heading">{card.title}</h3>
									<div className="support-hours-text">
										{(card.rows || []).map((row, rowIdx) => (
											<div key={rowIdx}>{row.label}{row.hours ? `: ${row.hours}` : ''}</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}
