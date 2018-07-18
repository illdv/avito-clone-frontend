import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';

export interface IState {

}

export interface IProps {

}

const mapStateToProps = (state: IRootState) => ({
	/// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	/*
	  onLoadingMail: () => {
	   dispatch(Mail.Actions.onLoadingMail.REQUEST());
	 },
	*/
});

export class ProfileMenu extends Component<IProps, IState> {

	state: IState = {};

	render() {
		return (
			<div className='account'>
				<div className='account__person'>
					<img
						src='/static/img/ads/ads3.png'
						alt=''
						className='account__img'
					/>
					<div>
						<h6 className='account__name'>Andy Kartman</h6>
						<span className='account__location'>Germany Berlin</span>
					</div>
				</div>
				<div className='account-navigation p-t-30'>
					<h5 className='account-navigation__heading'>
						My announcements
					</h5>
					<ul className='list-unstyled'>
						<li className='account-navigation__item'>
							<span>Posts</span>
							<span className='badge account__notifications-count'>3</span>
						</li>
						<li className='account-navigation__item'>
							<span>Notifications</span>
							<span className='badge account__notifications-count' />
						</li>
						<li className='account-navigation__item'>
							<span>Settings</span>
							<span className='badge notifications-count' />
						</li>
						<li className='account-navigation__item'>
							<span>History</span>
							<span className='badge notifications-count' />
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);