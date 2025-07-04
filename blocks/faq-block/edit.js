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
import { PanelBody, Button, TextControl } from '@wordpress/components';
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
						<div id={`faq-${i}`} className="faq-item" key={i} style={{ marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
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
							<Button
								isDestructive
								variant="secondary"
								onClick={() => removeFaq(i)}
								style={{ marginTop: '4px' }}
							>
								{__('Remove', 'docsy')}
							</Button>
						</div>
					))}
					<Button
						variant="primary"
						onClick={addFaq}
					>
						{__('Add FAQ', 'docsy')}
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
