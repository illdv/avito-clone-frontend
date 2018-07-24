import {Component} from 'react';
import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {IRootState} from 'client/common/store/storeInterface';
import {bindModuleAction} from 'client/common/user/utils';
import {IUserActions, UserActions} from 'client/common/user/actions';

export interface IState {

}

export interface IProps {
	userActions: IUserActions;
	show: any;
}

const mapStateToProps = (state: IRootState) => ({
	/// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	userActions: bindModuleAction(UserActions, dispatch),
});

class ProfileMenu extends Component<IProps, IState> {

	state: IState = {};

	onLogout = () => {
		this.props.userActions.logout.REQUEST({});
	}

	onSettings = () => {
		this.props.show({settings: true});
	}

	render() {
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
					<ul className='list-unstyled'>
						<li className='account-navigation__item account-navigation__item--active'>
							My announcements
							{/*<span className='notification account__notification'/>*/}
						</li>
						<li className='account-navigation__item'>
							Posts
							<span className='notification account__notification'>3</span>
						</li>
						<li className='account-navigation__item'>
							Notifications
							{/*<span className='notification account__notification'>5</span>*/}
						</li>
						<li
							className='account-navigation__item'
							onClick={this.onSettings}
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