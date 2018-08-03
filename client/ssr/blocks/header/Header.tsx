import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';

import LoginModal from '../../modals/auth/AuthModal';
import SendCodeToEmailModal from '../../modals/forgot-password/SendCodeToEmail';
import LanguageDropdown from './components/LanguageDropdown';
import { showLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { IRootState } from 'client/common/store/storeInterface';
import { UserActions, IUserActions } from 'client/common/entities/user/rootActions';
import { bindModuleAction } from 'client/common/entities/user/utils';
import { isServer } from 'client/common/utils/utils';
import { CustomStorage, getFavoritesFromLocalStorage } from 'client/common/entities/user/CustomStorage';
import ResetPasswordModal from 'client/ssr/modals/forgot-password/ResetPasswordModal';
import SuccessModal from 'client/ssr/modals/success/SuccessModal';
import MainLocationModal from 'client/ssr/modals/location/MainLocationModal';
import { initialize, ILocationSession, ILocationStoreState } from 'client/common/location/module';
import { getLocationState } from 'client/common/store/selectors';
import { showLocationModal } from 'client/ssr/modals/location/locationModalTriggers';
import SearchLocationModal from 'client/ssr/modals/location/SearchLocationModal';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';
import { useOrDefault } from 'client/spa/pages/create-ad/utils';
import { defaultPagePath } from '../../../spa/profile/constants';

require('../../../common/styles/main.sass');
require('./Header.sass');

export interface IState {

}

export interface IProps {
	user: IUserState;
	locationState: ILocationStoreState;
}

const mapStateToProps = (state: IRootState) => ({
	locationState: getLocationState(state),
	user: state.user,
});

class Header extends Component<IProps, IState> {
	constructor(props) {
		super(props);
	}

	// TODO refactor
	componentDidMount(): void {
		const { user } = this.props;
		const token    = CustomStorage.getToken();

		if (!isServer() && !user.profile && token) {
			UserActions.common.initUser.REQUEST({});
		}
	}

	renderLogin = () => {
		const { user } = this.props;
		const profile  = user.profile;
		const avatar   = profile && profile.image && profile.image.file_url || '/static/img/person.png';

		if (useOrDefault(() => user.profile.email, null)) {
			return (
				<Link href={defaultPagePath}>
					<div className='header__account'>
						<div className='header__account__profile'>
							<span className='header__account__name'>{profile.name}</span>
							<span className='header__account__email'>{profile.email}</span>
						</div>
						<img
							src={avatar}
							alt=''
							className='header__account__img'
						/>
					</div>
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

	onFavorites = () => {
		let count;
		try {
			count = getFavoritesFromLocalStorage().length;
		} catch (e) {
		}
		console.log('count', count);
		return (
			<Link href={`/favorites`}>
				<a
					href='#'
					className='header__favourites'
				><img
					src='/static/img/icons/like.svg'
					alt=''
					className='header__icon'
				/><span>Favourites</span>
					{count ? <span className="notification account__notification"> {count}</span> : null}
				</a>
			</Link>
		);
	};

	get localeName() {
		const { idCity, idRegion, idCountry } = this.props.locationState.session;

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
				<LoginModal />
				<SendCodeToEmailModal />
				<ResetPasswordModal />
				<SuccessModal />
				<MainLocationModal />
				<SearchLocationModal />
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
												<i className='header__icon fas fa-map-marker-alt' />
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

export default connect(mapStateToProps)(Header);
