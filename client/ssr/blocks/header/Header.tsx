import React, {Component} from 'react';
import {connect, Dispatch} from 'react-redux';
import Link from 'next/link';

import LoginModal from '../../modals/auth/AuthModal';
import SendCodeToEmailModal from '../../modals/forgot-password/SendCodeToEmail';
import LanguageDropdown from './components/LanguageDropdown';
import {showLoginModal} from 'client/ssr/modals/auth/loginModalTriggers';
import {IRootState} from 'client/common/store/storeInterface';
import {IUserState} from 'client/common/user/reducer';
import {IUserActions, UserActions} from 'client/common/user/actions';
import {bindModuleAction} from 'client/common/user/utils';
import {isServer} from 'client/common/utils/utils';
import axios from 'axios';
import {CustomStorage} from 'client/common/user/CustomStorage';
import ResetPasswordModal from 'client/ssr/modals/forgot-password/ResetPasswordModal';
import SuccessModal from 'client/ssr/modals/success/SuccessModal';

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
		const {user} = this.props.user;
		const token = CustomStorage.getToken();
		if (!isServer() && !user && token) {
			axios.defaults.headers.common.authorization = `Bearer ${token}`;
			this.props.userActions.initUser.REQUEST({});
		}
	}

	renderLogin = () => {
		const {user} = this.props.user;

		if (user) {
			return (
				<Link href={`/profile`}>
					<a>{user.email}</a>
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
	};

	render() {
		return (
			<header>
				<LoginModal/>
				<SendCodeToEmailModal/>
				<ResetPasswordModal/>
				<SuccessModal/>
				<div className='header header-top'>
					<div className='container'>
						<div className='row'>
							<div className='col-12'>
								<div className='header-top__container'>
									<ul className='navbar-nav'>
										<li className='nav-item'>
											<a href='#' className='header__location'>
												<i className='header__icon fas fa-map-marker-alt'/>
												<span>Berlin</span>
											</a>
										</li>
										<LanguageDropdown/>
									</ul>
									<ul className='navbar-nav'>
										<li className='nav-item'>
											<a href='#' className='header__favourites'>
												<img
													src='/static/img/icons/like.svg'
													className='header__icon'
													alt=''
												/>
												Favourites
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
				</div>
			</header>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
