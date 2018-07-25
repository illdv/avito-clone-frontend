import React, {Component} from 'react';
import SimilarSortedBy from 'client/ssr/blocks/ad/components/SimilarSortedBy';
import SimilarRandomAd from 'client/ssr/blocks/ad/components/SimilarRandomAd';
import {ISimilar} from 'client/ssr/blocks/ad/interface';

class SimilarAds extends Component <ISimilar> {
	render() {
		return (
			<div className='col-lg-4 pl-lg-3 py-md-5 py-lg-0'>
				<div className='row align-items-center'>
					<div className='col-md-12 col-lg-6'>
						<h3 className='caption_no-color m-0 mb-md-3'>Similar ads</h3>
					</div>
					<SimilarSortedBy/>
				</div>
				<div className='similar-ads'>
					<SimilarRandomAd
						id={this.props.random.id}
						title={this.props.random.title}
						price={this.props.random.price}
						userName={this.props.random.user.name}
						description={this.props.random.description}
					/>
				</div>
			</div>
		);
	}
}

export default SimilarAds;