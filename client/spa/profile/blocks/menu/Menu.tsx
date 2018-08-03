import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from 'client/common/entities/user/rootActions';
import { filterNotification } from 'client/spa/profile/pages/notifications/utils';

import { FilterType } from '../../pages/notifications/interface';

import {
	myActiveAdsPagePath,
	notificationPagePath,
	profileSettingsPagePath,
} from '../../constants';

export interface IProps {
	user: IUserState;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

const StylizedLinkStyle = {
	display: 'inline-block',
	width: '100%',
	height: '100%',
};

const StylizedLink: React.SFC<{ to: string }> = ({ to, children }) => (
	<li className='account-navigation__item'>
		<NavLink
			to={ to }
			activeClassName='account-navigation__item--active'
			style={ StylizedLinkStyle }
		>
			{ children }
		</NavLink>
	</li>
);

class ProfileMenu extends Component<IProps> {

	onLogout = () => {
		UserActions.common.logout.REQUEST({});
	}

	get userImage() {
		return this.props.user.profile &&
				this.props.user.profile.image &&
				this.props.user.profile.image.file_url || '/static/img/person.png';
	}

	get profileName() {
		return this.props.user.profile &&
				this.props.user.profile.name;
	}

	get profileEmail() {
		return this.props.user.profile &&
				this.props.user.profile.email;
	}

	render() {

		const { items } = this.props.user.notifications;

		const countNotReadNotification = filterNotification(FilterType.NoRead, items).length;

		return (
			<div className='account'>
				<div className='account__person'>
					<img
						alt=''
						src={ this.userImage }
						className='account__img'
					/>
					<div>
						<h6 className='account__name'>
							{ this.profileName }
						</h6>
						<span className='account__location'>
							{ this.profileEmail }
						</span>
					</div>
				</div>
				<div className='account-navigation'>
					<ul className='list-unstyled m-b-0'>
						<StylizedLink to={ myActiveAdsPagePath }>
							My announcements
						</StylizedLink>

						<StylizedLink to={'mock'}>
							Posts
						</StylizedLink>

						<StylizedLink to={ notificationPagePath }>
							Notifications
							{
								countNotReadNotification
								?
									<span className='notification account__notification'>{countNotReadNotification}</span>
								:
									null
							}
						</StylizedLink>

						<StylizedLink to={ profileSettingsPagePath }>
							Settings
						</StylizedLink>

						<StylizedLink to={'mock'}>
							History
						</StylizedLink>
						<li
							className='account-navigation__item'
							onClick={ UserActions.common.logout.REQUEST }
						>
							Logout
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default connect( mapStateToProps )(ProfileMenu);