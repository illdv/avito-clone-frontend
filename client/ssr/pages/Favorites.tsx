import * as React from 'react';
import { connect } from 'react-redux';
import FavoritesMenu from 'client/ssr/blocks/favorites/components/MenuFavorites';
import Favorites from 'client/ssr/blocks/favorites/Favorites';
import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from 'client/common/entities/user/rootActions';
import EmptyFavorites from 'client/ssr/layouts/EmptyFavorites';
import Navbar from '../blocks/navbar/Navbar';

require('client/common/styles/main.sass');
require('client/spa/profile/pages/my-ads/MyAds.sass'); // TODO remove this style

interface IProps {
	user: IUserState;
}

class FavoritesPage extends React.Component<IProps> {
	componentDidMount() {
		UserActions.favorites.getFavoritesAds.REQUEST({});
	}

	removeFavoriteAds = (favoritesId: string[]) => {
		UserActions.favorites.removeFavoritesAds.REQUEST({ favoritesId });
	}

	render() {
		const favoriteAds = this.props.user.favorites.items;
		return (
			<>
				<div className='header_bottom p-y-20'>
					<div className='container'>
						<Navbar />
					</div>
				</div>
				<section className='page'>
					<div className='container'>
						<div className='row'>
							{/* <div className='col-lg-3'>
								<FavoritesMenu/>
							</div> */}
							{/* <div className='col-lg-9'> */}
							<div className='col-lg-12'>
								{
									this.props.user.favorites.ids.length > 0
									?
										<Favorites ads={ favoriteAds } removeFavoriteAds={ this.removeFavoriteAds }/>
									:
										<EmptyFavorites />
								}

							</div>
						</div>
					</div>
				</section>
			</>
		);
	}

}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

export default connect(mapStateToProps)(FavoritesPage);
