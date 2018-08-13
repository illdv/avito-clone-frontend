import React from 'react';
import FooterNavigation from 'client/ssr/blocks/footer/FooterNavigation/FooterNavigation';

require('./Footer.sass');

class ProfileFooter extends React.Component {
	render() {
		return (
			<footer className='footer'>
				<div className='middle-footer'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-12 copyright-block'>
								<span className='copyright__text'>
									© Ads - classifieds site of Germany. Use of the site, including the submission of ads,
									means acceptance of the User Agreement.
									<br/>By paying for services on the site, you accept the offer. Information about cookies.
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className='bottom-footer'>
					<div className='container'>
						<div className='row justify-content-between no-gutters'>
							<div className='col-md-9 col-lg-7 '>
								<ul className='navbar-nav footer-nav'>
									<li className='footer-nav__item nav-item'>
										<a
											href='#'
											className='footer-nav__link'
										>
											<span>Submit an advertisement</span>
										</a>
									</li>
									<li className='footer-nav__item nav-item'>
										<a
											href='#'
											className='footer-nav__link'
										>
											<span>Advertisements</span>
										</a>
									</li>
									<li className='footer-nav__item nav-item'>
										<a
											href='#'
											className='footer-nav__link'
										>
											<span>Cooperation</span>
										</a>
									</li>
									<li className='footer-nav__item nav-item'>
										<a
											href='#'
											className='footer-nav__link'
										>
											<span>About us</span>
										</a>
									</li>
								</ul>
							</div>
							<div className='col-md-3  navbar-expand-lg text-right'>
								<ul className='navbar-nav justify-content-end footer-nav'>
									<li className='footer-nav__item nav-item'>
										<a
											href='#'
											className='footer-nav__link'
										>
											<span>Privacy &amp; Terms</span>
										</a>
									</li>
									<li className='footer-nav__item nav-item'>
										<a
											href='#'
											className='footer-nav__link'
										>
											<span>Help</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default ProfileFooter;