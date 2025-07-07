/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, PanelColorSettings, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, IconButton, RangeControl, ButtonGroup } from '@wordpress/components';
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
	} = attributes;

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
					onChange={setAlign}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Section Content', 'docsy')} initialOpen={true}>
					<TextControl
						label={__('Title', 'docsy')}
						value={title}
						onChange={val => setAttributes({ title: val })}
					/>
					<TextControl
						label={__('Subtitle', 'docsy')}
						value={subtitle}
						onChange={val => setAttributes({ subtitle: val })}
					/>
				</PanelBody>
				<PanelBody title={__('Cards', 'docsy')} initialOpen={true}>
					{cards.map((card, idx) => (
						<div key={idx} style={{ 
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
									{__('Card', 'docsy')} #{idx + 1} - {card.label || __('Untitled Card', 'docsy')}
								</h4>
								<ButtonGroup>
									<Button
										isSmall
										icon="arrow-up-alt2"
										label={__('Move Card Up', 'docsy')}
										onClick={() => moveCardUp(idx)}
										disabled={idx === 0}
									/>
									<Button
										isSmall
										icon="arrow-down-alt2"
										label={__('Move Card Down', 'docsy')}
										onClick={() => moveCardDown(idx)}
										disabled={idx === (cards.length - 1)}
									/>
									<Button
										isSmall
										isDestructive
										icon="trash"
										label={__('Remove Card', 'docsy')}
										onClick={() => removeCard(idx)}
									/>
								</ButtonGroup>
							</div>

							<TextControl
								label={__('Value', 'docsy')}
								value={card.value}
								onChange={val => updateCard(idx, 'value', val)}
							/>
							<TextControl
								label={__('Label', 'docsy')}
								value={card.label}
								onChange={val => updateCard(idx, 'label', val)}
							/>
							<TextControl
								label={__('Description', 'docsy')}
								value={card.desc}
								onChange={val => updateCard(idx, 'desc', val)}
							/>
							<PanelColorSettings
								title={__('Colors', 'docsy')}
								colorSettings={[
									{
										value: card.bgColor,
										onChange: val => updateCard(idx, 'bgColor', val),
										label: __('Background', 'docsy'),
									},
									{
										value: card.borderColor,
										onChange: val => updateCard(idx, 'borderColor', val),
										label: __('Border', 'docsy'),
									},
									{
										value: card.textColor,
										onChange: val => updateCard(idx, 'textColor', val),
										label: __('Text', 'docsy'),
									},
								]}
							/>
							<RangeControl
								label={__('Value Font Size', 'docsy')}
								value={card.valueSize}
								onChange={val => updateCard(idx, 'valueSize', val)}
								min={12}
								max={48}
							/>
							<RangeControl
								label={__('Label Font Size', 'docsy')}
								value={card.labelSize}
								onChange={val => updateCard(idx, 'labelSize', val)}
								min={10}
								max={32}
							/>
							<RangeControl
								label={__('Description Font Size', 'docsy')}
								value={card.descSize}
								onChange={val => updateCard(idx, 'descSize', val)}
								min={10}
								max={28}
							/>
						</div>
					))}
					<Button isPrimary onClick={addCard} style={{ width: '100%' }}>
						{__('Add New Card', 'docsy')}
					</Button>
				</PanelBody>
			</InspectorControls>
			<section className="response-time-section" {...useBlockProps()}>
				<div className="response-time-container">
					<div className="response-time-header" style={{ textAlign: align }}>
						<h2 className="response-time-title">{title}</h2>
						<p className="response-time-subtitle">{subtitle}</p>
					</div>
					<div
						className="response-time-grid"
						style={{
							justifyContent:
								align === 'center'
									? 'center'
									: align === 'right'
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
									textAlign: align,
								}}
							>
								<div
									className="response-time-value"
									style={{
										color: card.textColor,
										fontSize: card.valueSize,
										fontWeight: 'bold',
									}}
								>
									{card.value}
								</div>
								<div
									className="response-time-label"
									style={{
										fontSize: card.labelSize,
										// fontWeight: 600,
									}}
								>
									{card.label}
								</div>
								<div
									className="response-time-desc"
									style={{
										fontSize: card.descSize,
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
