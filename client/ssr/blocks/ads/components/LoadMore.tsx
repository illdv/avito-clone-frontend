import React from 'react';
import { connect } from 'react-redux';

import AdCard from 'client/ssr/blocks/ads/components/AdCard';
import { IRootState } from 'client/common/store/storeInterface';
import { AdsAPI } from 'client/common/api/AdsAPI';
import Spinner from '../../../../common/blocks/spinner/Spinner';
import { ISortedBy } from 'client/ssr/blocks/ads/Ads';

require('../Ads.sass');

export interface IAdsState {
	page: number;
	moreAds: IAd[];
	spinner: boolean;
}

export interface IAdsProps {
	user: IUserState;
	ads: IAd[];
	loadMore: boolean;
	lastPage: number;
	addToFavorites(id: number): void;
	order: ISortedBy,
}

class LoadMore extends React.Component<IAdsProps, IAdsState> {
	state = {
		page: 1,
		moreAds: [],
		spinner: false,
	};

	handleCreateMoreAds = () => () => {
		this.state.page++;
		let uri = `page=${this.state.page}`;
		this.state.spinner = true;
		if (this.props.order) {
			uri += `&orderBy[${this.props.order.field}]=${this.props.order.sort}`;
		}
		AdsAPI.getPage(uri)
			.then(value => {
				this.state.moreAds = [...this.state.moreAds, ...value.data.data];
				this.state.spinner = false;
				this.forceUpdate();
			});
	}

	render() {
		const { loadMore, lastPage } = this.props;
		const { page, moreAds, spinner } = this.state;

		return (
			<>
				{
					moreAds ?
						<div className='row p-t-30'>
							{
								moreAds.map((ad: IAd) => (
									<div
										key={ad.id}
										className='col-md-4 col-lg-3'
									>
										<AdCard
											ad={ad}
											favoritesIds={this.props.user.favorites.ids}
											addToFavorites={this.props.addToFavorites}
										/>
									</div>
								))
							}
						</div>
						: null
				}
				{
					spinner ?
						<div className='row'>
							<div className='col-md-12 d-flex justify-content-center'>
								<Spinner />
							</div>
						</div>
						: null
				}
				{
					(loadMore && page < lastPage) ?
						<div className='row'>
							<div className='col-md-12 d-flex justify-content-center bg-light'>
								<button
									type='button'
									className='btn owner-type__button button_dark button_dark-outline active'
									onClick={this.handleCreateMoreAds()}
								>Load more...
								</button>
							</div>
						</div>
						: null
				}
			</>
		);
	}
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

export default connect(mapStateToProps)(LoadMore);
