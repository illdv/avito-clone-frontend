import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import FavoritesMenu from 'client/spa/pages/favorites/FavoritesMenu';
import FavoritesPage from 'client/spa/pages/favorites/FavoritesPage';
import { bindModuleAction } from 'client/common/user/utils';
import { IRootState } from 'client/common/store/storeInterface';
import { IUserActions, UserActions } from 'client/common/user/actions';
import { IAds } from 'client/common/ads/interface';

interface IFavorites {
	favoriteAds: IAds[];
	userActions: IUserActions;
}

class Favorites extends React.Component<IFavorites, null> {
	componentDidMount() {
		this.props.userActions.getFavoritesAds.REQUEST({});
	}
	removeFavoriteAds = (favoritesId: string[])  => {
		this.props.userActions.removeFavoritesAds.REQUEST({favoritesId});
	};

	render() {
		const {favoriteAds} = this.props;
		return (
			<section className="page">
				<div className="container page__container-lg">
					<div className="row">
						<div className="col-lg-3">
							<FavoritesMenu />
						</div>
						<div className="col-lg-9">
							<FavoritesPage ads={favoriteAds} removeFavoriteAds={this.removeFavoriteAds}/>
						</div>
					</div>
				</div>
			</section>
		);
	}

}

const mapStateToProps = (state: IRootState) => ({
	favoriteAds: state.user.favoritesAds,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	userActions: bindModuleAction(UserActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
