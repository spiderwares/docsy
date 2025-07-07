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
	const { siteTitle, showLogo, selectedMenuId, menuItems, preferredMenuName, logoUrl } = attributes;

	return (
		<header { ...useBlockProps.save() } className="header">
			<div className="header-container">
				<div className="header-inner">
					<div className="header-left">
						{showLogo && (
							<div className="logo-bg">
								{logoUrl ? (
									<img src={logoUrl} alt="Logo" className="logo-img" style={{ width: 20, height: 20, objectFit: 'contain' }} />
								) : (
									<i className="logo-icon" data-fa-i2svg="">
										<svg className="svg-inline--fa fa-headset" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="headset" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
											<path fill="currentColor" d="M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z"></path>
										</svg>
									</i>
								)}
							</div>
						)}
						<div>
							<RichText.Content
								tagName="h1"
								className="site-title"
								value={siteTitle}
							/>
						</div>
					</div>
					<nav className="header-nav">
						{/* Dynamic menu will be rendered by PHP */}
						<div className="dynamic-menu-container" data-menu-id={selectedMenuId} data-menu-name={preferredMenuName}>
							{/* Fallback to custom menu items if no dynamic menu is selected */}
							{!selectedMenuId && menuItems.map((item, index) => (
								<a key={index} href={item.url} className="nav-link ">
									{item.text}
								</a>
							))}
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}
