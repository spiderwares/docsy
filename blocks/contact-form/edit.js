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
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

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
 * @param {Object} props Props.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, formShortcode } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Contact Form Settings', 'docsy')}>
					<TextControl
						label={__('Contact Form 7 Shortcode', 'docsy')}
						value={formShortcode}
						onChange={(value) => setAttributes({ formShortcode: value })}
						help={__('Enter your Contact Form 7 shortcode (e.g., [contact-form-7 id="1" title="Your Form"])', 'docsy')}
					/>
				</PanelBody>
			</InspectorControls>
			
			<section {...useBlockProps()} id="contact-form-section" className="contact-form-section">
				<div className="contact-container">
					<div className="contact-header">
						<RichText
							tagName="h2"
							className="contact-title"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder={__('Enter contact form title...', 'docsy')}
						/>
						<RichText
							tagName="p"
							className="contact-subtitle"
							value={subtitle}
							onChange={(value) => setAttributes({ subtitle: value })}
							placeholder={__('Enter contact form subtitle...', 'docsy')}
						/>
					</div>

					<div className="contact-box">
						<div className="contact-form-preview">
							<p className="contact-form-placeholder">
								{__('Contact Form 7 will be displayed here on the frontend', 'docsy')}
							</p>
							<code>{formShortcode}</code>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
