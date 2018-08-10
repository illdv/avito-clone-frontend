import React from 'react';
import { connect } from 'react-redux';

import AdCard from 'client/ssr/blocks/ads/components/AdCard';
import { IRootState } from 'client/common/store/storeInterface';
import { AdsAPI } from 'client/common/api/AdsAPI';
import Spinner from '../../../../common/blocks/spinner/Spinner';

require('../Ads.sass');

export interface IAdsState {
}

export interface IAdsProps {
	user: IUserState;
	ads: IAd[];
	loadMore: boolean;
	lastPage: number;
	page: number;
	spinner: boolean;
	onLoadMore(): void;
}

class LoadMore extends React.Component<IAdsProps, IAdsState> {

	handleCreateMoreAds = () => () => {
		this.props.onLoadMore();
	};

	render() {
		const { loadMore, lastPage, page, spinner } = this.props;

		return (
			<>
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
