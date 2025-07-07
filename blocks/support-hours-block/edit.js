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
import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, __experimentalInputControl as InputControl, ButtonGroup } from '@wordpress/components';
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
	const { title, subtitle, cards, backgroundColor, textColor } = attributes;

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
				<PanelBody title={__('Support Hours Settings', 'docsy')} initialOpen={true}>
					<TextControl
						label={__('Title', 'docsy')}
						value={title}
						onChange={(val) => setAttributes({ title: val })}
					/>
					<TextControl
						label={__('Subtitle', 'docsy')}
						value={subtitle}
						onChange={(val) => setAttributes({ subtitle: val })}
					/>
				</PanelBody>
				<PanelBody title={__('Cards', 'docsy')} initialOpen={false}>
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
									{__('Card', 'docsy')} #{cardIdx + 1} - {card.title || __('Untitled Card', 'docsy')}
								</h4>
								<ButtonGroup>
									<Button
										isSmall
										icon="arrow-up-alt2"
										label={__('Move Card Up', 'docsy')}
										onClick={() => moveCardUp(cardIdx)}
										disabled={cardIdx === 0}
									/>
									<Button
										isSmall
										icon="arrow-down-alt2"
										label={__('Move Card Down', 'docsy')}
										onClick={() => moveCardDown(cardIdx)}
										disabled={cardIdx === (cards.length - 1)}
									/>
									<Button
										isSmall
										isDestructive
										icon="trash"
										label={__('Remove Card', 'docsy')}
										onClick={() => removeCard(cardIdx)}
									/>
								</ButtonGroup>
							</div>

							<TextControl
								label={__('Card Title', 'docsy')}
								value={card.title}
								onChange={(val) => updateCard(cardIdx, 'title', val)}
							/>
							
							<div style={{ fontWeight: 'bold', margin: '1rem 0 0.5rem 0' }}>{__('Rows', 'docsy')}</div>
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
											{__('Row', 'docsy')} #{rowIdx + 1}
										</span>
										<ButtonGroup>
											<Button
												isSmall
												icon="arrow-up-alt2"
												label={__('Move Row Up', 'docsy')}
												onClick={() => moveRowUp(cardIdx, rowIdx)}
												disabled={rowIdx === 0}
											/>
											<Button
												isSmall
												icon="arrow-down-alt2"
												label={__('Move Row Down', 'docsy')}
												onClick={() => moveRowDown(cardIdx, rowIdx)}
												disabled={rowIdx === (card.rows.length - 1)}
											/>
											<Button
												isSmall
												isDestructive
												icon="trash"
												label={__('Remove Row', 'docsy')}
												onClick={() => removeRow(cardIdx, rowIdx)}
											/>
										</ButtonGroup>
									</div>
									
									<InputControl
										label={__('Label', 'docsy')}
										value={row.label}
										onChange={(val) => updateRow(cardIdx, rowIdx, 'label', val)}
									/>
									<InputControl
										label={__('Hours', 'docsy')}
										value={row.hours}
										onChange={(val) => updateRow(cardIdx, rowIdx, 'hours', val)}
									/>
								</div>
							))}
							<Button isPrimary onClick={() => addRow(cardIdx)} style={{ width: '100%', marginTop: '0.5rem' }}>
								{__('Add Row', 'docsy')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addCard} style={{ width: '100%' }}>
						{__('Add New Card', 'docsy')}
					</Button>
				</PanelBody>
				<PanelColorSettings
					title={__('Color Settings', 'docsy')}
					colorSettings={[
						{
							value: backgroundColor,
							onChange: (val) => setAttributes({ backgroundColor: val }),
							label: __('Background Color', 'docsy'),
						},
						{
							value: textColor,
							onChange: (val) => setAttributes({ textColor: val }),
							label: __('Text Color', 'docsy'),
						},
					]}
				/>
			</InspectorControls>
			<section id="support-hours" className="support-hours-section">
				<div className="support-hours-container">
					<div className="support-hours-card" style={{ background: backgroundColor, color: textColor }}>
						<h2 className="support-hours-title">{title}</h2>
						<p className="support-hours-subtitle">{subtitle}</p>
						<div className="support-hours-grid">
							{cards.map((card, cardIdx) => (
								<div key={cardIdx} id={card.title.toLowerCase().replace(/\s+/g, '-') || undefined}>
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
