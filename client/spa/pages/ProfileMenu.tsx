import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import { bindModuleAction } from 'client/common/user/utils';
import { IUserActions, UserActions } from 'client/common/user/actions';
import { MenuItem } from 'client/spa/pages/MainContent';
import { INotificationState } from 'client/common/notification/reducer';
import { filterNotification } from 'client/spa/pages/notification/utils'
import { FilterType } from 'client/spa/pages/notification/Notification'

export interface IState {

}

export interface IProps {
	user: IUser;
	userActions: IUserActions;
	onSelectMenuItem: (menuItem: MenuItem) => void;
	notification: INotificationState;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user.user,
	notification: state.notification,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	userActions: bindModuleAction(UserActions, dispatch),
});

class ProfileMenu extends Component<IProps, IState> {

	state: IState = {};

	onLogout = () => {
		this.props.userActions.logout.REQUEST({});
	}

	onSelectMenuItem = (menuItem: MenuItem) => () => {
		this.props.onSelectMenuItem(menuItem);
	}

	get userImage() {
		return this.props.user && this.props.user.image && this.props.user.image.file_url || '/static/img/person.png';
	}

	render() {

		const { data } = this.props.notification;

		const countNotReadNotification = filterNotification(FilterType.NoRead, data).length;

		return (
			<div className='account'>
				<div className='account__person' onClick={this.onSelectMenuItem(MenuItem.Settings)}>
					<img
						src={ this.userImage }
						alt=''
						className='account__img'
					/>
					<div>
						<h6 className='account__name'>{ this.props.user.name }</h6>
						<span className='account__location'>{ this.props.user.email }</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);