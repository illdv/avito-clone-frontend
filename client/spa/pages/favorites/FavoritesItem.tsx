import * as React from 'react';
import {IAds} from 'client/common/ads/interface';

interface IFavoritesItem {
	item: IAds;
	onCheck: any;
	checked: any;
}

const FavoritesItem: React.SFC<IFavoritesItem> = ({item, onCheck, checked}) => {
	const handleCheck = e => onCheck(item.id, e.target.checked);
	return (
		<div className='favourites-offer-block__item'>
			<input
				type='checkbox'
				className='custom-checkbox favorites-page__input'
				onChange={handleCheck}
				checked={!!(checked)}
			/>
			<div className='favourites-offer-block__inner'>
				<div className='row'>
					<div className='col-9 d-flex'>
						<img
							// TODO: add image
							src={item.images[0].file_url}
							alt=''
							className='offer-block__img'
						/>
						<div className='offer-block__info'>
							<a
								href='#'
								className='f-s-16'
							>
								<h5>{item.title}</h5>
							</a>
							<span>{item.description.slice(0, 110) + '...'}</span>{/* TODO fix slice */}
							<span className='d-inline-block favourites-offer-block_price'>{item.price} $</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FavoritesItem;
