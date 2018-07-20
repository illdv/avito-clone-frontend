import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import ToolBar from 'client/spa/pages/ToolBar';
import { ToastContainer } from 'react-toastify';
import { MainContent } from 'client/spa/pages/MainContent';
import { CustomStorage } from 'client/common/user/CustomStorage';
import CreateAdManager from 'client/spa/pages/createAd/CreateAdManager';
import ProfileFooter from 'client/ssr/blocks/footer/ProfileFooter';

export interface IState {
	isCreate: boolean;
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

export class Profile extends Component<IProps, IState> {

	state: IState = {
		isCreate: false,
	};

	componentDidMount(): void {
		if (!CustomStorage.getToken()) {
			window.location.href = '/';
		}
	}

	onCreateAd = () => {
		this.setState(state => ({
			isCreate: !state.isCreate,
		}));
	}

	render() {

		if (this.state.isCreate) {
			return (
				<div>
					<ToolBar onCreateAd={this.onCreateAd} />
					<CreateAdManager />
					<ToastContainer />
				</div>
			);
		}

		return (
			<>
				<ToolBar onCreateAd={this.onCreateAd} />
				<MainContent />
				<ProfileFooter />
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);