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
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';

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
import { PanelBody, Button, TextControl, IconButton } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { logo, repeater = [], footerText = '' } = attributes;

	const onSelectLogo = (media) => {
		setAttributes({ logo: media });
	};

	const onRemoveLogo = () => {
		setAttributes({ logo: null });
	};

	const updateRepeaterItem = (value, index) => {
		const newRepeater = [...repeater];
		newRepeater[index].text = value;
		setAttributes({ repeater: newRepeater });
	};

	const addRepeaterItem = () => {
		setAttributes({ repeater: [...repeater, { text: '' }] });
	};

	const removeRepeaterItem = (index) => {
		const newRepeater = [...repeater];
		newRepeater.splice(index, 1);
		setAttributes({ repeater: newRepeater });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Footer Settings', 'docsy')} initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectLogo}
							allowedTypes={['image']}
							value={logo ? logo.id : ''}
							render={({ open }) => (
								<div>
									<Button onClick={open} isSecondary>
										{logo ? __('Replace Logo', 'docsy') : __('Upload Logo', 'docsy')}
									</Button>
									{logo && (
										<div style={{ marginTop: '10px' }}>
											<img src={logo.url} alt={logo.alt || ''} style={{ maxWidth: '100%', height: 'auto' }} />
											<Button onClick={onRemoveLogo} isLink isDestructive>{__('Remove Logo', 'docsy')}</Button>
										</div>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				{logo && (
					<div className="footer-logo">
						<img src={logo.url} alt={logo.alt || ''} style={{ maxWidth: '120px', height: 'auto' }} />
					</div>
				)}

				<RichText
					tagName="div"
					value={footerText}
					onChange={(value) => setAttributes({ footerText: value })}
					placeholder={__('Enter footer text...', 'docsy')}
					className="footer-text"
				/>

				<div className="footer-repeater">
					{repeater.map((item, idx) => (
						<div key={idx} className="footer-repeater-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
							<TextControl
								value={item.text}
								onChange={(value) => updateRepeaterItem(value, idx)}
								placeholder={__('Repeater item text', 'docsy')}
							/>
							<IconButton
								icon="no-alt"
								label={__('Remove', 'docsy')}
								onClick={() => removeRepeaterItem(idx)}
								style={{ marginLeft: '8px' }}
							/>
						</div>
					))}
					<Button isSecondary onClick={addRepeaterItem}>{__('Add Item', 'docsy')}</Button>
				</div>
			</div>
		</Fragment>
	);
}
