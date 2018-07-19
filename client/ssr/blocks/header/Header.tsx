import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import Link from 'next/link';

import LoginModal from '../../modals/auth/AuthModal';
import ForgotPasswordModal from '../../modals/forgot-password/ForgotPasswordModal';
import LanguageDropdown from './components/LanguageDropdown';
import { showLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { IRootState } from 'client/common/store/storeInterface';
import { IUserState } from 'client/common/user/reducer';
import { IUserActions, UserActions } from 'client/common/user/actions';
import { bindModuleAction } from 'client/common/user/utils';
import { isServer } from 'client/common/utils/utils';
import axios from 'axios'
import { CustomStorage } from 'client/common/user/CustomStorage'

require('../../../common/styles/main.sass');
require('./Header.sass');

export interface IState {

}

export interface IProps {
	user: IUserState;
	userActions: IUserActions;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	userActions: bindModuleAction(UserActions, dispatch),
});

class Header extends Component<IProps, IState> {
	constructor(props) {
		super(props);
	}

	componentDidMount(): void {
		const { user } = this.props.user;
		const token    = CustomStorage.getToken();
		if (!isServer() && !user && token) {
			axios.defaults.headers.common.authorization = `Bearer ${token}`;
			this.props.userActions.initUser.REQUEST({});
		}
	}

	renderLogin = () => {
		const { user } = this.props.user;

		if (user) {
			return (
				<Link href={`/profile`}>
					<p>{user.email}</p>
				</Link>
			);
		}

		return (
			<button
				className='header__button_login'
				onClick={showLoginModal}
			>
				Login
			</button>
		);
	}

	render() {
		return (
			<header>
				<LoginModal />
				<ForgotPasswordModal />
				<div className='header header_top p-y-22 navbar-expand-sm'>
					<div className='container'>
						<div className='row justify-content-between no-gutters'>
							<div className='col-sm-6 col-md-4'>
								<ul className='navbar-nav'>
									<li className='nav-item'>
										<a
											href='#'
											className='header__location'
										>
											<i className='header__icon fas fa-map-marker-alt' />
											<span>Berlin</span>
										</a>
									</li>
									<LanguageDropdown />
								</ul>
							</div>
							<div className='col-md-4 navbar-expand-sm text-right'>
								<ul className='navbar-nav justify-content-end'>
									<li className='nav-item'>
										<a
											href='#'
											className='header__favourites p-x-40'
										>
											<img
												src='/static/img/icons/like.svg'
												alt=''
											/>
											<span>Favourites</span>
										</a>
									</li>
									<li className='nav-item'>
										{this.renderLogin()}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
