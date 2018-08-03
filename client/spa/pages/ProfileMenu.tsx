import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from '../../common/entities/user/rootActions';
import { filterNotification } from 'client/spa/profile/pages/notification/utils';
import { FilterType } from 'client/spa/profile/pages/notification/Notification';

import { defaultPagePath } from 'client/spa/profile/constants';

export interface IProps {
	user: IUserState;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

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
						src={ this.userImage }
						alt=''
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
						<NavLink
							to={defaultPagePath}
							className='account-navigation__item'
							activeClassName='account-navigation__item--active'
						>
							My announcements
						</NavLink>

						<li className='account-navigation__item'>
							Posts
						</li>
						<li
							className='account-navigation__item'
						>
							<NavLink to='/profile' >
								Notifications
								{
									countNotReadNotification
									&&
									<span className='notification account__notification'>{countNotReadNotification}</span>
									||
									<></>
								}
							</NavLink>
						</li>
						<li
							className='account-navigation__item'
						>
							Settings
						</li>
						<li className='account-navigation__item'>
							History
						</li>
						<li
							className='account-navigation__item'
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