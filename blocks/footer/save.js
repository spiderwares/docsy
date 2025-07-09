/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { 
		logo, 
		footerTitle = 'Docsy',
		footerDescription = 'Your go-to resource for getting the most out of our platform.',
		footerColumns = [],
		socialLinks = [],
		copyrightText = '© 2024 Help Center. All rights reserved.'
	} = attributes;

	const getSocialIcon = (platform, icon) => {
		if (icon && icon.url) {
			return `<img src="${icon.url}" alt="${icon.alt || platform}" style="width: 16px; height: 16px;" />`;
		}
		
		const icons = {
			twitter: `<svg class="svg-inline--fa fa-twitter" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>`,
			facebook: `<svg class="svg-inline--fa fa-facebook" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>`,
			linkedin: `<svg class="svg-inline--fa fa-linkedin" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>`
		};
		return icons[platform] || '';
	};

	const defaultLogo = "<svg class='svg-inline--fa fa-headset' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='headset' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' data-fa-i2svg=''><path fill='currentColor' d='M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z'></path></svg>";

	let displayLogo = '';
	if (logo) {
	  if (typeof logo === 'string') {
	    displayLogo = logo;
	  } else if (logo.url) {
	    displayLogo = logo.url;
	  }
	}
	if (!displayLogo) {
	  displayLogo = defaultLogo;
	}

	return (
		<div { ...useBlockProps.save() }>
			<div className="footer-container">
				<div className="footer-grid">
					<div id="footer-brand" className="footer-col">
						<div className="footer-brand-row">
						{logo && (
									<div className="logo-bg">
										{displayLogo.startsWith('<svg') ? (
										<div 
											className="logo-svg" 
											dangerouslySetInnerHTML={{ __html: displayLogo }}
											style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
										/>
									) : displayLogo.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
										<img src={displayLogo} alt="Logo" className="logo-img" style={{ width: 20, height: 20, objectFit: 'contain' }} />
									) : (
										<div 
											className="logo-svg" 
											dangerouslySetInnerHTML={{ __html: defaultLogo }}
											style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
										/>
									)}
								</div>
							)}
							<RichText.Content tagName="span" value={footerTitle} className="footer-title" />
						</div>
						<RichText.Content tagName="p" value={footerDescription} className="footer-desc" />
					</div>
					
					{footerColumns && footerColumns.length > 0 && footerColumns.map((column, columnIndex) => (
						<div key={columnIndex} className="footer-col">
							<RichText.Content tagName="h3" value={column.title} className="footer-heading" />
							{column.links && column.links.length > 0 && (
								<ul className="footer-list">
									{column.links.map((link, linkIndex) => (
										<li key={linkIndex}>
											<a href={link.url} className="footer-link">
												<RichText.Content tagName="span" value={link.text} />
											</a>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
				
				<div className="footer-bottom">
					<RichText.Content tagName="p" value={copyrightText} className="footer-copyright" />
					{socialLinks && socialLinks.length > 0 && (
						<div className="footer-socials">
							{socialLinks.map((social, index) => (
								<a key={index} href={social.url} className="footer-social-link">
									<i dangerouslySetInnerHTML={{ __html: getSocialIcon(social.platform, social.icon) }} />
								</a>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
