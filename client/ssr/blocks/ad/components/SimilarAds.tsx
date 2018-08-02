import React, { Component } from 'react';
import SimilarSortedBy from 'client/ssr/blocks/ad/components/SimilarSortedBy';
import SimilarRandomAd from 'client/ssr/blocks/ad/components/SimilarRandomAd';
import { ISimilarProps, ISimilarSortState } from 'client/ssr/blocks/ad/interface';
import { AdsAPI } from 'client/common/api/AdsAPI';

class SimilarAds extends Component <ISimilarProps, ISimilarSortState> {
	handleChange = sorted => {
		const field = 'sort-' + sorted;
		if (sorted !== this.state.filter) {
			this.setState({ filter: sorted });
		}
		AdsAPI.similar(field, this.props.id_parent)
			.then(response => {
				this.setState({ similar_ad: response.data });
			});
	}

	checkLength = () => {
		if (this.state.similar_ad.length === 0) {
			return (
				<div className='row d-flex justify-content-center'>
					<div className='col-10'>
						There are no more ads in this category
					</div>
				</div>
			);
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			similar_ad: this.props.similar_ads,
			filter: '',
		};
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
							this.state.similar_ad.map(sim => {
								return (
									<SimilarRandomAd
										id={sim.id}
										title={sim.title}
										price={sim.price}
										userName={sim.user.name}
										description={sim.description}
										image={sim.images[0] ? sim.images[0] : []}
										key={sim.id}
									/>
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