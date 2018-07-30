import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import ManagerAd, { IState as IManagerState } from '../blocks/manager-ad/ManagerAd';
import { IAds, IEditAdRequest } from 'client/common/ads/interface';

import { bindModuleAction } from 'client/common/user/utils';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { IRootState } from 'client/common/store/storeInterface';

import { useOrDefault } from '../utils/createAd';
import { ILocationStoreState } from 'client/common/location/locationInterface';
import { IAdsState } from '../../../common/ads/reducer';

interface MatchParams {
	id: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
	ads: IAdsState;
	locationState: ILocationStoreState;
	initialAd: IAds;
	adsActions: IAdsActions;
}

const mapStateToProps = (state: IRootState) => ({
	ads: state.ads,
	locationState: state.location,
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
			city_id: this.props.locationState.session.idCity,
			category_id: useOrDefault(() => selectedCategories[selectedCategories.length - 1].id, '1'),
			body: '1212',
			longitude: state.location.lng,
			latitude: state.location.lat,
			images,
		};

		this.props.adsActions.edit.REQUEST(data);
	}

	render() {
		console.log(this.props.match.params.id);
		console.log(this.props.ads);
		return null;
		// return  <ManagerAd initialAd={ this.props.initialAd } callback={ this.onEdit } />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAd);