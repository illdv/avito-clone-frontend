import React, { Component } from 'react';
import SimilarSortedBy from 'client/ssr/blocks/ad/components/SimilarSortedBy';
import SimilarRandomAd from 'client/ssr/blocks/ad/components/SimilarRandomAd';
import { ISimilarAdsProps, ISimilarAdsState } from 'client/ssr/blocks/ad/interface';
import { AdsAPI } from 'client/common/api/AdsAPI';

class SimilarAds extends Component <ISimilarAdsProps, ISimilarAdsState> {
	constructor(props) {
		super(props);
		this.state = {
			similar_ads: this.props.similar_ads,
			filter: '',
		};
	}

	handleChange = sorted => {
		const field = 'sort-' + sorted;
		if (sorted !== this.state.filter) {
			this.setState({ filter: sorted });
		}
		AdsAPI.similar(field, this.props.id_parent)
			.then(response => {
				this.setState({ similar_ads: response.data });
			});
	}

	render() {
		return (
			<div className='col-lg-4'>
				<div className='similar-ads-head'>
					<div className='row align-items-center p-b-20'>
						<div className='col-md-12 col-lg-6'>
							<h3 className='caption_no-color m-0 pb-md-3 pb-lg-0'>Similar ads</h3>
						</div>
						<SimilarSortedBy sort={this.handleChange} />
					</div>
					<div className='similar-ads-tiles'>
						{
							this.state.similar_ads.map(similar => {
								return (
									<SimilarRandomAd similar_ad={similar}/>
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