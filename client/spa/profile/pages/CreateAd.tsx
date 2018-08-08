import React from 'react';
import { connect } from 'react-redux';

import ManagerAd, { IState as IManagerState } from '../blocks/manager-ad/ManagerAd';
import { IRootState } from 'client/common/store/storeInterface';

import { useOrDefault } from '../utils/createAd';
import { ILocationStoreState } from 'client/common/location/locationInterface';
import { UserActions } from '../../../common/entities/user/rootActions';
import Spinner from '../../../common/blocks/spinner/Spinner';

interface IProps {
	user: IUserState;
	location: ILocationStoreState;
}

const mapStateToProps = (state: IRootState) => ({
	location: state.location,
	user: state.user,
});

class CreateAd extends React.Component<IProps> {

	onSave = (state: IManagerState) => {
		const selectedCategories = state.selectedCategories;

		UserActions.ownedAds.create.REQUEST({
			title: state.adInfoFields.title.value,
			description: state.adInfoFields.description.value,
			city_id: this.props.location.session.idCity || 1,
			price: state.adInfoFields.price.value,
			address: state.adInfoFields.address.value,
			body: '123213',
			category_id: useOrDefault(() => selectedCategories[selectedCategories.length - 1].id, null),
			longitude: state.location.lng,
			latitude: state.location.lat,
			phone: state.sellerInfoFields.phone.value,
			images: state.attachedImages.filter(attach => attach.file),
			options: state.options.map(option => ({
				id: option.item.id,
				value: option.value,
			})),
			is_vip: state.isVip,
			type_id: state.selectedType || 2, // For buy
		});
	}

	render() {
		if (!this.props.user.profile) {
			return <Spinner />;
		}
		return  <ManagerAd callback={ this.onSave } />;
	}
}

export default connect(mapStateToProps)(CreateAd);