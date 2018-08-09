import React from 'react';
import { connect } from 'react-redux';

import AdCard from 'client/ssr/blocks/ads/components/AdCard';
import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from 'client/common/entities/user/rootActions';
import AdsFilter from 'client/ssr/blocks/ads/components/AdsFilter';
import { AdsAPI } from 'client/common/api/AdsAPI';
import Spinner from '../../../common/blocks/spinner/Spinner';

require('./Ads.sass');

export interface IAdsState {
	page: number;
	per_page: number;
	moreAds: IAd[];
	spinner: boolean;
}

export interface IAdsProps {
	user: IUserState;
	title: string;
	ads: IAd[];
}

export enum IAdsOrder {
	ASC = 'ASC', DESC = 'DESC', DEFAULT = 'DEFAULT',
}

export enum IAdsFilter {
	personal = 'personal', company = 'company', all = 'all',
}

class Ads extends React.Component<IAdsProps, IAdsState> {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			per_page: 32,
			moreAds: [],
			spinner: false,
		};
	}
	addToFavorites = (id: number) => {
		UserActions.favorites.selectFavorite.REQUEST({ id });
	}

	onSelectFilter = (filter: IAdsFilter) => {
		console.log('filter', filter);
	}

	onSelectOrder = (order: IAdsOrder) => {
		console.log('filter', order);
	}

	createMoreAds = () => () => {
		this.state.page++;
		this.state.spinner = true;
		this.forceUpdate();
		AdsAPI.getPage(this.state.page)
			.then(value => {
				this.state.moreAds = [...this.state.moreAds,...value.data.data];
				this.state.per_page = parseInt(value.data.per_page, 10);
				this.state.spinner = false;
				this.forceUpdate();
			});
		console.log('Page', this.state.page);
	}

	render() {
		const { ads, title } = this.props;
		const { page, moreAds, per_page, spinner } = this.state;

		return (
			<section>
				{
					(ads && ads.length) ?
						<div className='container page__container-lg'>
							<div className='row'>
								<div className='col-md-12 '>
									<h3 className='page__title'>{title}</h3>
								</div>
							</div>
							{
								ads.length > 8 ?
									<AdsFilter
										selectFilter={this.onSelectFilter}
										selectOrder={this.onSelectOrder}
									/>
								: null
							}
							<div className='row p-t-30'>
								{
									ads.map((ad: IAd) => (
										<div
											key={ad.id}
											className='col-md-4 col-lg-3'
										>
											<AdCard
												ad={ad}
												favoritesIds={this.props.user.favorites.ids}
												addToFavorites={this.addToFavorites}
											/>
										</div>
									))
								}
								{
									moreAds ?
										moreAds.map((ad: IAd) => (
											<div
												key={ad.id}
												className='col-md-4 col-lg-3'
											>
												<AdCard
													ad={ad}
													favoritesIds={this.props.user.favorites.ids}
													addToFavorites={this.addToFavorites}
												/>
											</div>
										))
									: null
								}
							</div>
							{
								spinner ?
									<div className='row'>
										<div className='col-md-12 d-flex justify-content-center'>
											<Spinner />
										</div>
									</div>
								:null
							}
							{
								(page * per_page <= ads.length ||
								moreAds.length > 0 && (page - 1) * per_page <= moreAds.length) ?
									<div className='row'>
										<div className='col-md-12 d-flex justify-content-center bg-light'>
											<button
												type='button'
												className='btn owner-type__button button_dark button_dark-outline active'
												onClick={this.createMoreAds()}
											>Load more...
											</button>
										</div>
									</div>
								: null
							}
						</div>
					: null
				}
			</section>
		);
	}
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

export default connect(mapStateToProps)(Ads);
