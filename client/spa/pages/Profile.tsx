import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import ToolBar from 'client/spa/pages/ToolBar';
import Footer from 'client/ssr/blocks/footer/Footer';
import { ToastContainer } from 'react-toastify';
import { MainContent } from 'client/spa/pages/MainContent';
import { CustomStorage } from 'client/common/user/CustomStorage';
import CreateAdManager from 'client/spa/pages/createAd/CreateAdManager';
import { pushInRouter } from 'client/common/utils/utils';
import { IAdsState, PageName } from 'client/common/ads/reducer';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { bindModuleAction } from 'client/common/user/utils';

export interface IState {
}

export interface IProps {
	adsActions: IAdsActions;
	ads: IAdsState;
}

const mapStateToProps = (state: IRootState) => ({
	ads: state.ads,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	adsActions: bindModuleAction(AdsActions, dispatch),
});

export class Profile extends Component<IProps, IState> {

	state: IState = {
		isCreate: false,
	};

	componentDidMount(): void {
		if (!CustomStorage.getToken()) {
			pushInRouter('/');
		}
	}

	onClickCreateAd = () => {
		this.props.adsActions.changePage.REQUEST(PageName.Create);
	}

	render() {

		const { currentPage } = this.props.ads;

		if (currentPage === PageName.Create) {
			return (
				<div>
					<ToolBar onCreateAd={this.onClickCreateAd} />
					<CreateAdManager />
				</div>
			);
		}

		return (
			<>
				<ToolBar onCreateAd={this.onClickCreateAd} />
				<MainContent />
				<Footer />
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);