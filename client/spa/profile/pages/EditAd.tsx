import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import ManagerAd, { IState as IManagerState } from '../blocks/manager-ad/ManagerAd';
import { IRootState } from 'client/common/store/storeInterface';

import { useOrDefault } from '../utils/createAd';
import { ILocationStoreState } from 'client/common/location/locationInterface';
import { IEditAdRequest } from 'client/common/entities/user/modules/owned-ads/interfaces';
import { UserActions } from '../../../common/entities/user/rootActions';
import Spinner from '../../../common/blocks/spinner/Spinner';

interface IMatchParams {
	id: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {
	locationState: ILocationStoreState;
	user: IUserState;
}

const mapStateToProps = (state: IRootState) => ({
	locationState: state.location,
	user: state.user,
});

interface IState {
	editingAdId: number;
	editingAd: IAd;
	notFound: boolean;
	itemsCount: number;
}

class EditAd extends React.Component<IProps, IState> {

	state = {
		editingAdId: null,
		editingAd: null,
		notFound: null,
		itemsCount: 0,
	};
	
	static getDerivedStateFromProps(newProps: IProps, prevSate: IState) {
		const editingAdId = Number(newProps.match.params.id);
		const items = newProps.user.ownedAds.items;
		
		if (editingAdId !== prevSate.editingAdId || items.length !== prevSate.itemsCount) {
			let notFound = true;
			let editingAd = null;

			newProps.user.ownedAds.items.forEach(item => {
				if (item.id === editingAdId) {
					notFound = false;
					editingAd = item;
				}
			});

			return {
				editingAdId,
				notFound,
				editingAd,
				itemsCount: items.length,
			} as IState;
		} else {
			return prevSate;
		}
	}

	// TODO SUKA UDALI!!!
	componentDidMount(): void {
		UserActions.ownedAds.getMy.REQUEST({});
	}

	onEdit = (state: IManagerState) => {
		const images = state.attachedImages.filter(image => !image.isBackend);

		const selectedCategories = state.selectedCategories;

		const data: IEditAdRequest = {
			ad_id: this.state.editingAd.id,
			phone: state.sellerInfoFields.phone.value,
			price: state.adInfoFields.price.value,
			title: state.adInfoFields.title.value,
			address: state.adInfoFields.address.value,
			description: state.adInfoFields.description.value,
			city_id: state.adInfoFields.city_id,
			category_id: useOrDefault(() => selectedCategories[selectedCategories.length - 1].id, null),
			body: '1212',
			longitude: state.location.lng,
			latitude: state.location.lat,
			images,
			options: state.options.map(option => ({
				id: option.item.id,
				value: option.value,
			})),
			is_vip: state.isVip,
			type_id: state.selectedType || 2, // For buy

		};

		UserActions.ownedAds.edit.REQUEST(data);
	}

	render() {
		if (this.props.user.ownedAds.isLoading || this.state.notFound) {
			return <Spinner />;
		}
		return  <ManagerAd initialAd={ this.state.editingAd }
		                   callback={ this.onEdit }
		                   loadedLocation={ this.props.locationState.loaded }
		                   isEditing={ true }
		/>;
	}
}

export default connect(mapStateToProps)(EditAd);