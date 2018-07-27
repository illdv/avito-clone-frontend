import React from 'react';
import { connect, Dispatch } from 'react-redux';

import ManagerAd, { IState as IManagerState } from './ManagerAd';
import { IAds, Image, IEditAdRequest } from '../../../common/ads/interface';

import { bindModuleAction } from 'client/common/user/utils';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { IRootState } from '../../../common/store/storeInterface';

import { useOrDefault } from './utils';
import { ILocationStoreState } from 'client/common/location/locationInterface';

interface IProps {
	location: ILocationStoreState;
	initialAd: IAds;
	adsActions: IAdsActions;
}

const mapStateToProps = (state: IRootState) => ({
	location: state.loation,
	user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	adsActions: bindModuleAction(AdsActions, dispatch),
});

class EditAd extends React.Component<IProps> {
	onEdit = (state: IManagerState) => {
		const images = state.attachedImages.filter(image => !image.isBackend);

		const selectedCategories = state.selectedCategories;

		const data: IEditAdRequest = {
			ad_id: this.props.initialAd.id,
			phone: state.sellerInfoFields.phone.value,
			price: state.adInfoFields.price.value,
			title: state.adInfoFields.title.value,
			description: state.adInfoFields.description.value,
			type_id: this.props.initialAd.type_id,
			city_id: this.props.location.session.idCity,
			category_id: useOrDefault(() => selectedCategories[selectedCategories.length - 1].id, '1'),
			body: '1212',
			longitude: state.location.lng,
			latitude: state.location.lat,
			images,
		};

		this.props.adsActions.edit.REQUEST(data);
	}

	render() {
		return  <ManagerAd initialAd={ this.props.initialAd } callback={ this.onEdit } />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAd);