import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import ConfirmAds from 'client/spa/pages/createAd/ConfirmAds';
import CreateAd, { IAdsDataForCreate } from 'client/spa/pages/createAd/CreateAd';
import { bindModuleAction } from 'client/common/user/utils';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { IAdsState } from 'client/ssr/blocks/ad/interface';
import { IAds } from 'client/common/ads/interface';
import { generateId } from 'client/spa/pages/utils';
import { IUserState } from 'client/common/user/reducer';

export interface IState {
	data: IAdsDataForCreate;
}

export interface IProps {
	adsActions: IAdsActions;
	ads: IAdsState;
	user: IUserState;
}

const mapStateToProps = (state: IRootState) => ({
	ads: state.ads,
	user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	adsActions: bindModuleAction(AdsActions, dispatch),
});

class CreateAdManager extends Component<IProps, IState> {

	state: IState = {
		data: null,
	};

	onNext = (data: IAdsDataForCreate) => {
		this.setState({
			data,
		});
	}

	onBack = () => {
		this.setState({
			data: null,
		});
	}

	onCreate = () => {
		const { lat, lng, images, selectedCategory } = this.state.data;
		const { description, price, title, phone }   = this.state.data.fields;

		this.props.adsActions.create.REQUEST({
			title,
			description,
			city_id: 1,
			price,
			body: '123213',
			is_published: false,
			is_vip: false,
			category_id: selectedCategory[selectedCategory.length - 1].id,
			type_id: 1,
			longitude: lng,
			latitude: lat,
			phone,
			images,
		});
	}

	render() {

		if (this.state.data) {
			return (
				<ConfirmAds
					onBack={this.onBack}
					onCreate={this.onCreate}
					data={this.state.data}
				/>
			);
		}

		const { phone } = this.props.user.user;

		const ad: IAds = {
			id: generateId(),
			title: '',
			description: '',
			city_id: 1,
			price: '',
			body: '123213',
			is_published: true,
			is_vip: false,
			category_id: '1',
			type_id: 1,
			longitude: 55.75222,
			latitude: 37.61140,
			phone,
		};

		return (
			<CreateAd
				data={ad}
				onNext={this.onNext}
			/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdManager);