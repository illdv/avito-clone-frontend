import React from 'react';
import { connect } from 'react-redux';

import AdCard from 'client/ssr/blocks/ads/components/AdCard';
import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from 'client/common/entities/user/rootActions';
import AdsFilter from 'client/ssr/blocks/ads/components/AdsFilter';
import LoadMore from 'client/ssr/blocks/ads/components/LoadMore';
import { AdsAPI } from 'client/common/api/AdsAPI';

require('./Ads.sass');

export interface IAdsState {
	ads: IAd[];
	page: number;
	spinner: boolean;
	sort: string;
}

export interface IAdsProps {
	user: IUserState;
	title: string;
	ads: IAd[];
	loadMore: boolean;
	lastPage: number;
}

export interface ISelectSort {
	order: string;
}
export interface ISortedBy {
	field: string;
	title: string;
	sort: string;
}

export enum IAdsFilter {
	personal = 'personal', company = 'company', all = 'all',
}

class Ads extends React.Component<IAdsProps, IAdsState> {
	constructor(props) {
		super(props);
		this.state = {
			ads: this.props.ads,
			page: 1,
			spinner: false,
			sort: 'orderBy[created_at]=desc',
		};
	}
	addToFavorites = (id: number) => {
		UserActions.favorites.selectFavorite.REQUEST({ id });
	}

	onSelectFilter = (filter: IAdsFilter) => {
		console.log('filter', filter);
	}

	onSelectOrder = (order: ISelectSort) => {
		const parse: ISortedBy = JSON.parse(order);
		let sort = `orderBy[${parse.field}]=${parse.sort}`;
		const search = decodeURI(location.search).replace('?', '');
		if (search !== '') {
			sort += '&' + search;
		}
		this.setState({
			page: 1,
			sort: sort,
		});
		AdsAPI.get(sort).then(res => {
			this.setState({ads: res.data.data});
		})
			.catch(err => {
				console.log(err);
		});
	};

	onLoadMore = () => {
		this.state.spinner = true;
		this.state.page++;
		AdsAPI.getPage(this.state.sort, this.state.page)
			.then(res => {
				this.setState({
						ads: [...this.state.ads, ...res.data.data],
					spinner: false,
				});
		})
			.catch(err => {
				console.log(err);
		});

	};

	render() {
		const { title, lastPage, loadMore } = this.props;
		const { ads, page, spinner } = this.state;

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
							</div>
							<LoadMore
								loadMore={loadMore}
								lastPage={lastPage}
								page={page}
								spinner={spinner}
								onLoadMore={this.onLoadMore}
							/>
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
