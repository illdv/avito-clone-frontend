import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import ToolBar from 'client/spa/pages/ToolBar';
import { MainContent } from 'client/spa/pages/MainContent';
import { CustomStorage } from 'client/common/entities/user/CustomStorage';
import CreateAd from 'client/spa/pages/create-ad/CreateAd';
import { pushInRouter } from 'client/common/utils/utils';
import { PageNames } from 'client/common/entities/user/modules/owned-ads/interfaces';
import EditAd from 'client/spa/pages/create-ad/EditAd';
import ProfileFooter from 'client/ssr/blocks/footer/ProfileFooter';
import { UserActions } from '../../common/entities/user/rootActions';

export interface IState {
}

export interface IProps {
	user: IUserState;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

export class Profile extends Component<IProps, IState> {

	state: IState = {
		isCreate: false,
	};

	componentDidMount(): void {
		if (!CustomStorage.getToken()) {
			pushInRouter('/');
		}
		UserActions.notifications.loading.REQUEST({});
	}

	onClickCreateAd = () => {
		const currentPage = this.props.user.ownedAds.currentPage;

		if (currentPage === PageNames.Create || currentPage === PageNames.Edit) {
			UserActions.ownedAds.changePage.REQUEST(PageNames.Profile);
		} else {
			UserActions.ownedAds.changePage.REQUEST(PageNames.Create);
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

		const { currentPage, selectedId, ads } = this.props.user.ownedAds;

		if (currentPage === PageNames.Create) {
			return (
				<div>
					<ToolBar onCreateAd={this.onClickCreateAd} />
					<CreateAd />
				</div>
			);
		}

		if (currentPage === PageNames.Edit) {
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

export default connect(mapStateToProps)(Profile);