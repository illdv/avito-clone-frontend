import React from 'react';
import { connect } from 'react-redux';

import AdCard from 'client/ssr/blocks/ads/components/AdCard';
import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from 'client/common/entities/user/rootActions';
import AdsFilter from 'client/ssr/blocks/ads/components/AdsFilter';

require('./Ads.sass');

export interface IAdsProps {
	user: IUserState;
	title: string;
	ads: IAd[];
}

export enum  IAdsOrder {
	ASC = 'ASC', DESC = 'DESC', DEFAULT = 'DEFAULT',
}

export enum  IAdsFilter {
	personal = 'personal', company = 'company', all = 'all',
}

class Ads extends React.Component<IAdsProps> {
	addToFavorites = (id: number) => {
		UserActions.favorites.selectFavorite.REQUEST({ id });
	}

	onSelectFilter = (filter: IAdsFilter) => {
		console.log('filter', filter);
	}

	onSelectOrder = (order: IAdsOrder) => {
		console.log('filter', order);
	}

	render() {
		const {ads, title} = this.props;

		return (
			<section>
				<div className='container page__container-lg'>
					<div className='row'>
						<div className='col-md-12 '>
							<h3 className='page__title'>{title}</h3>
						</div>
					</div>
					{
						ads.length > 8 ? <AdsFilter selectFilter={this.onSelectFilter} selectOrder={this.onSelectOrder}/>
						: null
					}
					<div className='row p-t-30'>
						{
							ads && ads.map((ad: IAd) => (
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
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

export default connect(mapStateToProps)(Ads);
