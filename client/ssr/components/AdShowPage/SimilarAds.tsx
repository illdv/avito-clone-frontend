import React, { ChangeEvent, Component } from 'react';
import { ISimilarAdsProps, ISimilarAdsState } from 'client/ssr/blocks/ad/interface';
import { AdsAPI } from 'client/common/api/AdsAPI';
import SimilarSortedBy from 'client/ssr/components/AdShowPage/SimilarSortedBy';
import SimilarRandomAd from 'client/ssr/components/AdShowPage/SimilarRandomAd';

class SimilarAds extends Component <ISimilarAdsProps, ISimilarAdsState> {
	state = {
			similar_ads: this.props.similar_ads,
			filter: '',
	};

	orderBy = (e: ChangeEvent<HTMLInputElement>) => {
		const field = 'sort-' + e.target.value;
		const { filter } = this.state;
		if (e.target.value !== filter) {
			this.setState({ filter: e.target.value });
		}

		this.getOrderSimilar(field, this.props.id_parent);
	}

	getOrderSimilar(field, id) {
		AdsAPI.similar(field, id)
			.then(response => {
				this.setState({ similar_ads: response.data });
			});
	}

	render() {
		const {similar_ads} = this.state;
		return (
			<div className='col-lg-4'>
				<div className='similar-ads-head'>
					<div className='row align-items-center p-b-20'>
						<div className='col-md-12 col-lg-6'>
							<h3 className='caption_no-color m-0 pb-md-3 pb-lg-0'>Similar ads</h3>
						</div>
						<SimilarSortedBy sort={this.orderBy} />
					</div>
					<div className='similar-ads-tiles'>
						{
							similar_ads.map(similar => {
								return (
									<SimilarRandomAd similar_ad={similar} key={similar.id}/>
								);
							})
						}
					</div>
				</div>
			</div>
		);
	}
}

export default SimilarAds;