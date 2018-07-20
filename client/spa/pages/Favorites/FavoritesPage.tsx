import * as React from 'react';
import { IAds } from 'client/common/ads/interface';
import FavoritesItem from 'client/spa/pages/Favorites/FavoritesItem';

interface IFavoritesPage {
	ads: IAds[]
}

const FavoritesPage: React.SFC<IFavoritesPage> = ({ ads }) => {
	return (
		<>
			<div className="remove-offer">
				<input type="checkbox" className="favorites-page__input" />
				<button className="btn button button_dark-outline w-25 remove-offer__button">Remove</button>
			</div>
			<div className="favourites-offer-block">
				{ ads ? ads.map(ad => <FavoritesItem item={ad}/>) : <div>You don't have any favorites Ads </div>}
			</div>
		</>
	);
};

export default FavoritesPage;
