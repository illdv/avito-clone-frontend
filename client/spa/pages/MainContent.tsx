import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import ProfileMenu from 'client/spa/pages/ProfileMenu';
import MyAds from 'client/spa/pages/MyAds';
import ProfileSettings from 'client/spa/pages/ProfileSettings/ProfileSettings';
import Notification from 'client/spa/pages/notification/Notification';

export enum MenuItem {
	Settings      = 'Settings',
	Notifications = 'Notifications',
	MyAds         = 'MyAds',
}

export interface IState {
	selectItem: MenuItem;
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

export class MainContent extends Component<IProps, IState> {
	state: IState = {
		selectItem: MenuItem.MyAds,
	};

	onSelectMenuItem = (menuItem: MenuItem) => {
		this.setState({ selectItem: menuItem });
	}

	renderContent = () => {
		switch (this.state.selectItem) {
			case MenuItem.MyAds:
				return <MyAds />;
			case MenuItem.Notifications:
				return <Notification />;
			case MenuItem.Settings:
				return <ProfileSettings />;
			default:
				return <MyAds />;
		}
	}

	render() {
		return (
			<section className='page'>
				<div className='container page__container-lg'>
					<div className='row'>
						<div className='col-lg-3'>
							<ProfileMenu onSelectMenuItem={this.onSelectMenuItem} />
						</div>
						<div className='col-lg-9'>
							{this.renderContent()}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);