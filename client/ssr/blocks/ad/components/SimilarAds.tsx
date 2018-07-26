import React, { Component } from 'react';
import SimilarSortedBy from 'client/ssr/blocks/ad/components/SimilarSortedBy';
import SimilarRandomAd from 'client/ssr/blocks/ad/components/SimilarRandomAd';
import { ISimilar, ISimilarSortState } from 'client/ssr/blocks/ad/interface';
import { AdsAPI } from 'api/AdsAPI';

class SimilarAds extends Component <ISimilar, ISimilarSortState> {
	handleChange = (sorted) => {
		let field = 'sort-' + sorted;
		if (sorted !== this.state.filter) {
			this.setState({filter: sorted});
		}
		AdsAPI.similar(field, this.props.id_parent)
			.then((response) => {
				this.setState({similar_ad: response.data});
			});
	};

	constructor(props){
		super (props);
		this.state = {
			similar_ad: this.props.similar_ad,
			filter: '',
		};
	}

	componentDidMount() {
		 this.interval = setInterval(() => this.handleChange(this.state.filter), 30000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className='col-lg-4'>
				<div className='similar-ads-head'>
					<div className='row align-items-center'>
						<div className='col-md-12 col-lg-6'>
							<h3 className='caption_no-color m-0'>Similar ads</h3>
						</div>
						<SimilarSortedBy sort={this.handleChange}/>
					</div>
					<div className='similar-ads-tiles'>
						<SimilarRandomAd
							id={this.state.similar_ad.id}
							title={this.state.similar_ad.title}
							price={this.state.similar_ad.price}
							userName={this.state.similar_ad.user.name}
							description={this.state.similar_ad.description}
							image={this.state.similar_ad.images[0]}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default SimilarAds;