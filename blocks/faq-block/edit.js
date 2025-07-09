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
import { PanelBody, Button, TextControl, ButtonGroup, TabPanel, ColorPalette, SelectControl } from '@wordpress/components';
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
		headerTitle,
		headerSubtitle,
		headerTitleColor,
		headerSubtitleColor,
		padding,
		borderRadius,
		boxShadow,
		textAlign,
		questionColor,
		answerColor,
		gap
	} = attributes;

	const stylePresets = [
		{ name: 'Black', color: '#111827' },
		{ name: 'Gray', color: '#4B5563' },
		{ name: 'White', color: '#fff' },
		{ name: 'Blue', color: '#2563EB' },
		{ name: 'Purple', color: '#7C3AED' },
		{ name: 'Green', color: '#059669' },
	];

	const blockStyle = {
		'--faq-bg': backgroundColor,
		'--faq-text': textColor,
		'--faq-header-title': headerTitleColor,
		'--faq-header-subtitle': headerSubtitleColor,
		'--faq-padding': padding,
		'--faq-radius': borderRadius,
		'--faq-shadow': boxShadow,
		'--faq-align': textAlign,
		'--faq-question': questionColor,
		'--faq-answer': answerColor,
		'--faq-gap': gap,
	};

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
								</>
							)}
							{tab.name === 'style' && (
								<>
									<PanelBody title={__('Block Style', 'docsy')} initialOpen={true}>
										<ColorPalette
											colors={stylePresets}
											value={backgroundColor}
											onChange={(color) => setAttributes({ backgroundColor: color })}
										/>
										<ColorPalette
											colors={stylePresets}
											value={textColor}
											onChange={(color) => setAttributes({ textColor: color })}
										/>
										<TextControl
											label={__('Padding', 'docsy')}
											value={padding}
											onChange={(value) => setAttributes({ padding: value })}
											placeholder="2rem 1rem"
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
										<TextControl
											label={__('Gap between FAQs', 'docsy')}
											value={gap}
											onChange={(value) => setAttributes({ gap: value })}
											placeholder="1.5rem"
										/>
									</PanelBody>
									<PanelBody title={__('Header Style', 'docsy')} initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={headerTitleColor}
											onChange={(color) => setAttributes({ headerTitleColor: color })}
										/>
										<ColorPalette
											colors={stylePresets}
											value={headerSubtitleColor}
											onChange={(color) => setAttributes({ headerSubtitleColor: color })}
										/>
									</PanelBody>
									<PanelBody title={__('FAQ Item Style', 'docsy')} initialOpen={false}>
										<ColorPalette
											colors={stylePresets}
											value={questionColor}
											onChange={(color) => setAttributes({ questionColor: color })}
										/>
										<ColorPalette
											colors={stylePresets}
											value={answerColor}
											onChange={(color) => setAttributes({ answerColor: color })}
										/>
									</PanelBody>
								</>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>
			<section
				{ ...useBlockProps({ style: blockStyle }) }
				id="faq-section"
			>
				<div className="faq-container">
					<div className="faq-header">
						<h2 style={{ color: 'var(--faq-header-title)' }}>{headerTitle}</h2>
						<p style={{ color: 'var(--faq-header-subtitle)' }}>{headerSubtitle}</p>
					</div>
					<div className="faq-list" style={{ gap: 'var(--faq-gap)' }}>
						{faqs.map((faq, i) => (
							<div id={`faq-${i}`} className="faq-item" key={i}>
								<button type="button" disabled style={{ width: '100%', textAlign: 'left', color: 'var(--faq-question)' }}>
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
								<div className="faq-content" style={{ color: 'var(--faq-answer)' }}>
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
