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
	userActions: IUserActions;
	onSelectMenuItem: (menuItem: MenuItem) => void;
	notification: INotificationState;
}

const mapStateToProps = (state: IRootState) => ({
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

	render() {

		const { data } = this.props.notification;

		const countNotReadNotification = filterNotification(FilterType.NoRead, data).length;

		return (
			<div className='account'>
				<div className='account__person'>
					<img
						src='/static/img/person.png'
						alt=''
						className='account__img'
					/>
					<div>
						<h6 className='account__name'>Andy Kartman</h6>
						<span className='account__location'>Germany Berlin</span>
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
							<span className='notification account__notification'>{countNotReadNotification}</span>
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