import * as React from 'react';
import FavoritesMenu from 'client/spa/pages/Favorites/FavoritesMenu';
import FavoritesPage from 'client/spa/pages/Favorites/FavoritesPage';
import { adsMock } from 'client/spa/pages/Favorites/__mock__/idsMock';

interface IFavorites {
	children: any;
	actions: any;
}

const Favorites: React.SFC<IFavorites> = ({ children, actions }) => {
	const onRequest = () => {
		actions;
	};

	return (
		<section className="page">
			<div className="container page__container-lg">
				<div className="row">
					<div className="col-lg-3">
						<FavoritesMenu />
					</div>
					<div className="col-lg-9">
						<FavoritesPage ads={adsMock} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Favorites;
