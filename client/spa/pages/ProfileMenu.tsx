import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import { MenuItem } from 'client/spa/pages/MainContent';
import { filterNotification } from 'client/spa/pages/notification/utils';
import { FilterType } from 'client/spa/pages/notification/Notification';
import { UserActions } from '../../common/entities/user/rootActions';

export interface IProps {
	user: IUserState;
	onSelectMenuItem: (menuItem: MenuItem) => void;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

class ProfileMenu extends Component<IProps> {

	onLogout = () => {
		UserActions.common.logout.REQUEST({});
	}

	onSelectMenuItem = (menuItem: MenuItem) => () => {
		this.props.onSelectMenuItem(menuItem);
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
				<div className='account__person' onClick={this.onSelectMenuItem(MenuItem.Settings)}>
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
						{/* TODO change email in location */}
					</div>
				</div>
				<div className='account-navigation'>
					<ul className='list-unstyled m-b-0'>
						<li
							onClick={this.onSelectMenuItem(MenuItem.MyAds)}
							className='account-navigation__item account-navigation__item--active'
						>
							My announcements
							{/*<span className='notification account__notification'/>*/}
						</li>
						<li className='account-navigation__item'>
							Posts
							{/*<span className='notification account__notification'>3</span>*/}
						</li>
						<li
							onClick={this.onSelectMenuItem(MenuItem.Notifications)}
							className='account-navigation__item'
						>
							Notifications
							{
								countNotReadNotification
								&&
								<span className='notification account__notification'>{countNotReadNotification}</span>
								||
								<></>
							}
						</li>
						<li
							className='account-navigation__item'
							onClick={this.onSelectMenuItem(MenuItem.Settings)}
						>
							Settings
							{/*<span className='notification account__notification'/>*/}
						</li>
						<li className='account-navigation__item'>
							History
							{/*<span className='notification account__notification'/>*/}
						</li>
						<li
							className='account-navigation__item'
							onClick={this.onLogout}
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