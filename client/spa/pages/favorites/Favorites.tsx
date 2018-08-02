import * as React from 'react';
import { connect } from 'react-redux';
import FavoritesMenu from 'client/spa/pages/favorites/FavoritesMenu';
import FavoritesPage from 'client/spa/pages/favorites/FavoritesPage';
import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from '../../../common/entities/user/rootActions';

interface IProps {
	user: IUserState;
}

class Favorites extends React.Component<IProps, null> {
	componentDidMount() {
		UserActions.favorites.getFavoritesAds.REQUEST({});
	}

	removeFavoriteAds = (favoritesId: string[]) => {
		UserActions.favorites.removeFavoritesAds.REQUEST({ favoritesId });
	}

	render() {
		const favoriteAds = this.props.user.favorites.items;

		return (
			<section className='page'>
				<div className='container'>
					<div className='row'>
						{/* <div className='col-lg-3'>
							<FavoritesMenu/>
						</div> */}
						{/* <div className='col-lg-9'> */}
						<div className='col-lg-12'>
							<FavoritesPage ads={ favoriteAds } removeFavoriteAds={ this.removeFavoriteAds }/>
						</div>
					</div>
				</div>
			</section>
		);
	}

}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

export default connect(mapStateToProps)(Favorites);
