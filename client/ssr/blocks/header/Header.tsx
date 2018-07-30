import React, {Component} from 'react';
import {connect, Dispatch} from 'react-redux';
import Link from 'next/link';
import axios from 'axios';

import LoginModal from '../../modals/auth/AuthModal';
import SendCodeToEmailModal from '../../modals/forgot-password/SendCodeToEmail';
import LanguageDropdown from './components/LanguageDropdown';
import { showLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { IRootState } from 'client/common/store/storeInterface';
import { IUserState } from 'client/common/user/reducer';
import { IUserActions, UserActions } from 'client/common/user/actions';
import { bindModuleAction } from 'client/common/user/utils';
import { isServer } from 'client/common/utils/utils';
import { CustomStorage, getFavoritesFromLocalStorage } from 'client/common/user/CustomStorage';
import ResetPasswordModal from 'client/ssr/modals/forgot-password/ResetPasswordModal';
import SuccessModal from 'client/ssr/modals/success/SuccessModal';
import MainLocationModal from 'client/ssr/modals/location/MainLocationModal';
import {initialize, ILocationSession, ILocationStoreState} from 'client/common/location/module';
import {getLocationState} from 'client/common/store/selectors';
import {showLocationModal} from 'client/ssr/modals/location/locationModalTriggers';
import SearchLocationModal from 'client/ssr/modals/location/SearchLocationModal';
import {ModalNames} from '../../../common/modal-juggler/modalJugglerInterface';
import {useOrDefault} from 'client/spa/pages/create-ad/utils';

require('../../../common/styles/main.sass');
require('./Header.sass');

export interface IState {

}

export interface IProps {
	user: IUserState;
	userActions: IUserActions;
	locationState: ILocationStoreState;
}

const mapStateToProps = (state: IRootState) => ({
	locationState: getLocationState(state),
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
		const token    = CustomStorage.getToken();
		if (!isServer() && !user.id && token) {
			axios.defaults.headers.common.authorization = `Bearer ${token}`;
			this.props.userActions.initUser.REQUEST({});
		}
	}

	renderLogin = () => {
		const {user} = this.props.user;
		if (useOrDefault(() => user.email, null)) {
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
	}

	onFavorites = () => {
		let count;
		try {
			count = getFavoritesFromLocalStorage().length;
		} catch (e) {
		}
		console.log(count);
		return (
			<Link href={`/favorites`}>
				<a
					href='#'
					className='header__favourites '
				>
					<img
						src='/static/img/icons/like.svg'
						alt=''
						className='header__icon'
					/>
					<span>Favourites</span>
					 {count && count !=='0' && <span className="notification account__notification"> {count}</span>}
				</a>
			</Link>
		);
	}

	get localeName() {
		const {idCity, idRegion, idCountry} = this.props.locationState.session;

		if (idCity) {
			if (this.props.locationState.loaded.session.cities.length > 0) {

				const result = this.props.locationState.loaded.session.cities.filter(city => {
					return city.city_id === idCity;
				});

				if (result.length > 0) {
					return result[0].title;
				}
			}
		}

		if (idRegion) {
			if (this.props.locationState.loaded.session.regions.length > 0) {
				const result = this.props.locationState.loaded.session.regions.filter(region => {
					return region.region_id === idRegion;
				});
				if (result.length > 0) {
					return result[0].title;
				}
			}
		}

		if (idCountry) {
			if (this.props.locationState.loaded.session.countries.length > 0) {
				const result = this.props.locationState.loaded.session.countries.filter(country => {
					return country.country_id === idCountry;
				});
				if (result.length > 0) {
					return result[0].title;
				}
			}
		}

		return 'World';
	}

	showMainLocationModal = () => showLocationModal(ModalNames.location);

	shouldComponentUpdate(newProps) {
		return JSON.stringify(this.props) !== JSON.stringify(newProps);
	}

	render() {
		return (
			<header>
				<LoginModal/>
				<SendCodeToEmailModal/>
				<ResetPasswordModal/>
				<SuccessModal/>
				<MainLocationModal/>
				<SearchLocationModal/>
				<div className='header header-top'>
					<div className='container'>
						<div className='row'>
							<div className='col-12'>
								<div className='header-top__container'>
									<ul className='navbar-nav'>
										<li className='nav-item'>
											<a
												href='#'
												className='header__location'
											>
												<i className='header__icon fas fa-map-marker-alt'/>
												<span onClick={this.showMainLocationModal}>{this.localeName}</span>
											</a>
										</li>
										<LanguageDropdown />
									</ul>
									<ul className='navbar-nav'>
										<li className='nav-item'>
											{this.onFavorites()}
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
