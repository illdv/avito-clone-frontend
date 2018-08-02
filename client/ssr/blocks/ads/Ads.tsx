import React from 'react';
import { connect } from 'react-redux';

import AdCard from 'client/ssr/blocks/ads/components/AdCard';
import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from 'client/common/entities/user/rootActions';

require('./Ads.sass');

export interface IAdsProps {
	user: IUserState;
	title: string;
	ads: IAd[];
}

class Ads extends React.Component<IAdsProps> {
	addToFavorites = (id: number) => {
		UserActions.favorites.selectFavorite.REQUEST({ id });
	}

	render() {
		const {ads, title} = this.props;

		return (
			<section className='section-sm'>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<h3 className='m-b-20'>{title}</h3>
						</div>
					</div>
					<div className='row'>
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
