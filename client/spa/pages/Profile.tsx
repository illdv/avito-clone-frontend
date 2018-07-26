import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import ToolBar from 'client/spa/pages/ToolBar';
import { MainContent } from 'client/spa/pages/MainContent';
import { CustomStorage } from 'client/common/user/CustomStorage';
import CreateAd from 'client/spa/pages/create-ad/CreateAd';
import { pushInRouter } from 'client/common/utils/utils';
import { IAdsState, PageName } from 'client/common/ads/reducer';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { bindModuleAction } from 'client/common/user/utils';
import EditAd from 'client/spa/pages/create-ad/EditAd';
import ProfileFooter from 'client/ssr/blocks/footer/ProfileFooter';
import { INotificationActions, NotificationActions } from 'client/common/notification/actions';

export interface IState {
}

export interface IProps {
	adsActions: IAdsActions;
	ads: IAdsState;
	notificationActions: INotificationActions;
}

const mapStateToProps = (state: IRootState) => ({
	ads: state.ads,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	adsActions: bindModuleAction(AdsActions, dispatch),
	notificationActions: bindModuleAction(NotificationActions, dispatch),
});

export class Profile extends Component<IProps, IState> {

	state: IState = {
		isCreate: false,
	};

	componentDidMount(): void {
		if (!CustomStorage.getToken()) {
			pushInRouter('/');
		}
		this.props.notificationActions.loading.REQUEST({});
	}

	onClickCreateAd = () => {
		const currentPage = this.props.ads.currentPage;
		if (currentPage === PageName.Create || currentPage === PageName.Edit) {
			this.props.adsActions.changePage.REQUEST(PageName.Profile);
		} else {
			this.props.adsActions.changePage.REQUEST(PageName.Create);
		}
	}

	/* onSave = (data: IAdsDataForCreate) => {
		const { lat, lng, images, selectedCategory } = data;
		const { description, price, title }          = data.fields;

		const { selectedId, ads } = this.props.ads;

		const selectedAd = ads.filter(ad => ad.id === selectedId)[0];

		this.props.adsActions.edit.REQUEST({
			...selectedAd,
			title,
			description,
			price,
			body: '---',
			category_id: useOrDefault(() => selectedCategory[selectedCategory.length - 1].id, '1'),
			type_id: 1,
			longitude: lng,
			latitude: lat,
			images: images as any,
		});
	} */

	render() {

		const { currentPage, selectedId, ads } = this.props.ads;

		if (currentPage === PageName.Create) {
			return (
				<div>
					<ToolBar onCreateAd={this.onClickCreateAd} />
					<CreateAd />
				</div>
			);
		}

		if (currentPage === PageName.Edit) {
			const selectedAd = ads.filter(ad => ad.id === selectedId)[0];
			return (
				<div>
					<ToolBar onCreateAd={this.onClickCreateAd} />
					<EditAd initialAd={selectedAd} />
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