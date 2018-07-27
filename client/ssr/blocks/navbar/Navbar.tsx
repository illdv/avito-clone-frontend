import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../../common/store/storeInterface';
import { userInfo } from 'os';

require('../../../common/styles/main.sass');
require('./Navbar.sass');

interface IProps {
	user: IUser;
}


class Navbar extends React.Component<IProps> {
	constructor(props, context) {
		super(props, context);
	}

	render() {
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
						{/* <button
							className='btn orange-btn'
						>
							Submit an advertisement
						</button> */}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user.user,
});

export default connect(mapStateToProps)(Navbar);