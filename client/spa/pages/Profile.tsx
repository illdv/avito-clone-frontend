import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import ToolBar from 'client/spa/pages/ToolBar';
import Footer from 'client/ssr/blocks/footer/Footer';
import { ToastContainer } from 'react-toastify';
import { MainContent } from 'client/spa/pages/MainContent';

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

export class Profile extends Component<IProps, IState> {

	state: IState = {};

	render() {
		return (
			<>
				<ToolBar />
				<MainContent/>
				<Footer />
				<ToastContainer />
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);