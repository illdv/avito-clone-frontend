import React from 'react';

class Footer extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className='footer__bottom'>
				<div className='container'>

					<div className='row justify-content-between no-gutters'>
						<div className='col-md-9 col-lg-7 '>
							<ul className='navbar-nav bottom__nav'>
								<li className='nav-item'>
									<a
										href='#'
										className='no-p-l'
									>
										<span>Submit an advertisement</span>
									</a>
								</li>
								<li className='nav-item'>
									<a
										href='#'
										className='nav__link'
									>
										<span>Advertisements</span>
									</a>
								</li>
								<li className='nav-item'>
									<a
										href='#'
										className='nav__link'
									>
										<span>Cooperation</span>
									</a>
								</li>
								<li className='nav-item'>
									<a
										href='#'
										className='nav__link'
									>
										<span>About us</span>
									</a>
								</li>
							</ul>
						</div>
						<div className='col-md-3  navbar-expand-lg text-right'>
							<ul className='navbar-nav justify-content-end bottom__nav'>
								<li className='nav-item'>
									<a
										href='#'
										className='nav__link'
									>
										<span>Privacy & Terms</span>
									</a>
								</li>
								<li className='nav-item'>
									<a
										href='#'
										className='nav__link'
									>
										<span>Help</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;