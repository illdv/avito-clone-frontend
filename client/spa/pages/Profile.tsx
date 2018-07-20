import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import ToolBar from 'client/spa/pages/ToolBar';
import { ToastContainer } from 'react-toastify';
import Footer from 'client/ssr/blocks/footer/Footer';
import { MainContent } from 'client/spa/pages/MainContent';
import { CustomStorage } from 'client/common/user/CustomStorage';
import CreateAdManager from 'client/spa/pages/createAd/CreateAdManager';
import { pushInRouter } from 'client/common/utils/utils';
import { IAdsState, PageName } from 'client/common/ads/reducer';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { bindModuleAction } from 'client/common/user/utils';
import CreateAd, { IAdsDataForCreate } from 'client/spa/pages/createAd/CreateAd'
import ProfileFooter from 'client/ssr/blocks/footer/ProfileFooter';

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

	onClickCreateAd = () => {
		const currentPage = this.props.ads.currentPage;
		if (currentPage === PageName.Create || currentPage === PageName.Edit) {
			this.props.adsActions.changePage.REQUEST(PageName.Profile);
		} else {
			this.props.adsActions.changePage.REQUEST(PageName.Create);
		}
	}

	onSave = (data: IAdsDataForCreate) => {
		const { lat, lng }                  = data;
		const { description, price, title } = data.fields;

		const { selectedId, ads } = this.props.ads;

		const selectedAd = ads.filter(ad => ad.id === selectedId)[0];

		this.props.adsActions.edit.REQUEST({
			...selectedAd,
			title,
			description,
			price,
			body: '---',
			is_published: 0,
			is_vip: 0,
			category_id: 1,
			type_id: 1,
			longitude: lng,
			latitude: lat,
		});
	}

	componentDidMount(): void {
		if (!CustomStorage.getToken()) {
			pushInRouter('/');
		}
	}

	render() {

		const { currentPage, selectedId, ads } = this.props.ads;

		if (currentPage === PageName.Create) {
			return (
				<div>
					<ToolBar onCreateAd={this.onClickCreateAd} />
					<CreateAdManager />
				</div>
			);
		}

		if (currentPage === PageName.Edit) {
			const selectedAd = ads.filter(ad => ad.id === selectedId)[0];
			return (
				<div>
					<ToolBar onCreateAd={this.onClickCreateAd} />
					<CreateAd
						data={selectedAd}
						onNext={this.onSave}
					/>
				</div>
			);
		}

		return (
			<>
				<ToolBar onCreateAd={this.onClickCreateAd} />
				<MainContent />
				<ProfileFooter />
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);