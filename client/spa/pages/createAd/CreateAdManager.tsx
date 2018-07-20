import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import ConfirmAds from 'client/spa/pages/createAd/ConfirmAds';
import CreateAd, { IAdsDataForCreate } from 'client/spa/pages/createAd/CreateAd';
import { bindModuleAction } from 'client/common/user/utils';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { IAdsState } from 'client/ssr/blocks/ad/interface';

export interface IState {
	data: IAdsDataForCreate;
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
		const { cityId, lat, lng, locationName } = this.state.data;
		const { description, price, title }      = this.state.data.fields;
		this.props.adsActions.create.REQUEST({
			title,
			description,
			city_id: '1',
			price: +price,
			body: '123213',
			is_published: 0,
			is_vip: 0,
			category_id: 1,
			type_id: 1,
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

		return <CreateAd onNext={this.onNext} />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdManager);