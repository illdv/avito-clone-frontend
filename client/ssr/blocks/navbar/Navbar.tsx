import React from 'react';
import { connect } from 'react-redux';

import { IRootState } from '../../../common/store/storeInterface';
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
							<ul className='main-navigation'>
								<li className='nav-item'>
									<a href='/search?category_id=14'>Cars</a>
								</li>
								<li className='nav-item '>
									<a href='/search?category_id=1'>The property</a>
								</li>
								<li className='nav-item'>
									<a href='/search?category_id=4'>Job</a>
								</li>
								<li className='nav-item'>
									<a href='/search'>Yet...</a>
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