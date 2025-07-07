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
import { PanelBody, Button, TextControl, ButtonGroup } from '@wordpress/components';
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
		faqs = [],
		textColor,
		backgroundColor,
		headerTitle = __('Frequently Asked Questions', 'docsy'),
		headerSubtitle = __('Quick answers to common questions', 'docsy'),
	} = attributes;

	const updateFaq = (index, field, value) => {
		const newFaqs = [...faqs];
		newFaqs[index][field] = value;
		setAttributes({ faqs: newFaqs });
	};

	const addFaq = () => {
		setAttributes({ faqs: [...faqs, { question: '', answer: '' }] });
	};

	const removeFaq = (index) => {
		const newFaqs = faqs.filter((_, i) => i !== index);
		setAttributes({ faqs: newFaqs });
	};

	// Move FAQ up
	const moveFaqUp = (index) => {
		if (index === 0) return; // Can't move first FAQ up
		const newFaqs = [...faqs];
		[newFaqs[index], newFaqs[index - 1]] = [newFaqs[index - 1], newFaqs[index]];
		setAttributes({ faqs: newFaqs });
	};

	// Move FAQ down
	const moveFaqDown = (index) => {
		if (index === faqs.length - 1) return; // Can't move last FAQ down
		const newFaqs = [...faqs];
		[newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]];
		setAttributes({ faqs: newFaqs });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Header', 'docsy')} initialOpen={true}>
					<TextControl
						label={__('Header Title', 'docsy')}
						value={headerTitle}
						onChange={(val) => setAttributes({ headerTitle: val })}
						placeholder={__('Frequently Asked Questions', 'docsy')}
					/>
					<TextControl
						label={__('Header Subtitle', 'docsy')}
						value={headerSubtitle}
						onChange={(val) => setAttributes({ headerSubtitle: val })}
						placeholder={__('Quick answers to common questions', 'docsy')}
					/>
				</PanelBody>
				<PanelColorSettings
					title={__('Color settings', 'docsy')}
					colorSettings={[
						{
							value: textColor,
							onChange: (color) => setAttributes({ textColor: color }),
							label: __('Text color', 'docsy'),
						},
						{
							value: backgroundColor,
							onChange: (color) => setAttributes({ backgroundColor: color }),
							label: __('Background color', 'docsy'),
						},
					]}
				/>
				<PanelBody title={__('FAQ Items', 'docsy')} initialOpen={false}>
					{faqs.map((faq, i) => (
						<div key={i} style={{ 
							border: '1px solid #ddd', 
							borderRadius: '8px', 
							marginBottom: '1rem', 
							padding: '1rem',
							backgroundColor: '#f9f9f9'
						}}>
							{/* FAQ Header with Controls */}
							<div style={{ 
								display: 'flex', 
								justifyContent: 'space-between', 
								alignItems: 'center', 
								marginBottom: '1rem',
								paddingBottom: '0.5rem',
								borderBottom: '1px solid #eee'
							}}>
								<h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
									{__('FAQ', 'docsy')} #{i + 1} - {faq.question || __('Untitled FAQ', 'docsy')}
								</h4>
								<ButtonGroup>
									<Button
										isSmall
										icon="arrow-up-alt2"
										label={__('Move FAQ Up', 'docsy')}
										onClick={() => moveFaqUp(i)}
										disabled={i === 0}
									/>
									<Button
										isSmall
										icon="arrow-down-alt2"
										label={__('Move FAQ Down', 'docsy')}
										onClick={() => moveFaqDown(i)}
										disabled={i === (faqs.length - 1)}
									/>
									<Button
										isSmall
										isDestructive
										icon="trash"
										label={__('Remove FAQ', 'docsy')}
										onClick={() => removeFaq(i)}
									/>
								</ButtonGroup>
							</div>

							<TextControl
								label={__('Question', 'docsy')}
								value={faq.question}
								onChange={(val) => updateFaq(i, 'question', val)}
								placeholder={__('Enter question', 'docsy')}
							/>
							<TextControl
								label={__('Answer', 'docsy')}
								value={faq.answer}
								onChange={(val) => updateFaq(i, 'answer', val)}
								placeholder={__('Enter answer', 'docsy')}
							/>
						</div>
					))}
					<Button
						variant="primary"
						onClick={addFaq}
						style={{ width: '100%' }}
					>
						{__('Add New FAQ', 'docsy')}
					</Button>
				</PanelBody>
			</InspectorControls>
			<section
				{ ...useBlockProps() }
				id="faq-section"
				style={{ backgroundColor, color: textColor, padding: '16px' }}
			>
				<div className="faq-container">
					<div className="faq-header">
						<h2>{headerTitle}</h2>
						<p>{headerSubtitle}</p>
					</div>
					<div className="faq-list">
						{faqs.map((faq, i) => (
							<div id={`faq-${i}`} className="faq-item" key={i}>
								<button type="button" disabled style={{ width: '100%', textAlign: 'left' }}>
									<span>{faq.question || __('Question', 'docsy')}</span>
									<i className="faq-icon" style={{ marginLeft: '8px' }}>
										<svg
											width="16"
											height="16"
											viewBox="0 0 448 512"
											style={{ transition: 'transform 0.2s' }}
										>
											<path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
										</svg>
									</i>
								</button>
								<div className="faq-content">
									<p>{faq.answer || __('Answer', 'docsy')}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</Fragment>
	);
}
