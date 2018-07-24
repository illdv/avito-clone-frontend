import React from 'react';
import FooterNavigation from 'client/ssr/blocks/footer/FooterNavigation/FooterNavigation';

require('./Footer.sass');

class Footer extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<footer className='footer'>
				<div className='top-footer'>
					<div className='container top-footer__container'>
						<FooterNavigation/>
					</div>
				</div>
				<div className='middle-footer'>
					<div className='container'>
						<div className='row'>
							<div className='col-12'>
								<div className='copyright-block'>
									© Ads - classifieds site of Germany. Use of the site, including the submission of ads,
									means acceptance of the User Agreement.
									<br/>By paying for services on the site, you accept the offer. Information about cookies.
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='bottom-footer'>
					<div className='container'>
						<div className='row'>
							<div className='col-12'>
								<div className='bottom-footer__container'>
									<ul className='navbar-nav'>
										<li className='nav-item footer-nav__item'>
											<a href='#'>
												Submit an advertisement
											</a>
										</li>
										<li className='nav-item footer-nav__item'>
											<a href='#'>
												Advertisements
											</a>
										</li>
										<li className='nav-item footer-nav__item'>
											<a href='#'>
												Cooperation
											</a>
										</li>
										<li className='nav-item footer-nav__item'>
											<a href='#'>
												About us
											</a>
										</li>
									</ul>

									<ul className='navbar-nav'>
										<li className='nav-item footer-nav__item'>
											<a href='#'>
												Privacy &amp; Terms
											</a>
										</li>
										<li className='nav-item footer-nav__item'>
											<a href='#'>
												Help
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;