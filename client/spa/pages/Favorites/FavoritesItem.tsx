import * as React from 'react';
import { IAds } from 'client/common/ads/interface';

interface IFavoritesItem {
	item: IAds
}

const FavoritesItem: React.SFC<IFavoritesItem> = ({ item }) => {
	return (
		<div className="favourites-offer-block__item">
			<input
				type="checkbox"
				className="favorites-page__input"
			/>
			<div className="favourites-offer-block__inner">
				<div className="row no-gutters">
					<div className="col-md-3 col-lg-3">
						<img
							//TODO: add image
							src="./static/img/ads/ads3.png"
							alt=""
							className="favourites-offer-block__img"
						/>
					</div>
					<div className="col-md-6 col-lg-6">
						<a
							href="#"
							className="f-s-16"
						>
							<h5>
								{item.title}
							</h5>
						</a>
						<span className="d-inline-block favourites-offer-block_price">{item.price} $</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FavoritesItem;
