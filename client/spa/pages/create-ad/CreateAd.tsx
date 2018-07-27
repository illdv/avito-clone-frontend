import React from 'react';
import { connect, Dispatch } from 'react-redux';

import ManagerAd, { IState as IManagerState } from './ManagerAd';
import { bindModuleAction } from 'client/common/user/utils';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { IRootState } from 'client/common/store/storeInterface';

import { useOrDefault } from './utils';
import { ILocationStoreState } from 'client/common/location/locationInterface';

interface IProps {
	adsActions: IAdsActions;
	location: ILocationStoreState;
}

const mapStateToProps = (state: IRootState) => ({
	location: state.loation,
	user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	adsActions: bindModuleAction(AdsActions, dispatch),
});

class CreateAd extends React.Component<IProps> {

	onSave = (state: IManagerState) => {

		const selectedCategories = state.selectedCategories;

		this.props.adsActions.create.REQUEST({
			title: state.adInfoFields.title.value,
			description: state.adInfoFields.description.value,
			city_id: this.props.location.session.idCity || 1,
			price: state.adInfoFields.price.value,
			body: '123213',
			category_id: useOrDefault(() => selectedCategories[selectedCategories.length - 1].id, '1'),
			type_id: 1,
			longitude: state.location.lng,
			latitude: state.location.lat,
			phone: state.sellerInfoFields.phone.value,
			images: state.attachedImages.filter(attach => attach.file),
		});
	}

	render() {
		return  <ManagerAd callback={ this.onSave } />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAd);