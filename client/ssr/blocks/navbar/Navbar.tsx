import React from 'react';
import { connect } from 'react-redux';

import { IRootState } from '../../../common/store/storeInterface';
import history from 'client/common/history';
import { createAdPagePagePath } from '../../../spa/profile/constants';
import { showLoginModal } from '../../modals/auth/loginModalTriggers';

require('../../../common/styles/main.sass');
require('./Navbar.sass');

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

interface IProps {
	user: IUserState;
}

class Navbar extends React.Component<IProps> {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		const method = this.props.user.profile
			? () => location.href = createAdPagePagePath
			: () => showLoginModal();

		return (
			<div className='row'>
				<div className='col-12'>
					<div className='navbar__container'>
						<nav className='navbar menu'>
							<a href='/' className='navbar-brand logo'>
								<img src='/static/img/logo.svg' alt=''/>
							</a>
							<ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
								<li className='nav-item'>
									<a href='/category/cars'>Cars</a>
								</li>
								<li className='nav-item '>
									<a href='/category/properties'>The property</a>
								</li>
								<li className='nav-item'>
									<a href='/category/business-jobs'>Job</a>
								</li>
								<li className='nav-item'>
									<a href='/category'>Yet...</a>
								</li>
							</ul>
						</nav>
						<button
							className='btn orange-btn'
							onClick={method}
						>
							Submit an advertisement
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Navbar);