import * as React from 'react';

interface IFavoritesItem {
	item: IAd;
	onCheck: any;
	checked: any;
}



const FavoritesItem: React.SFC<IFavoritesItem> = ({item, onCheck, checked}) => {
	const handleCheck = e => onCheck(item.id, e.target.checked);

	const checkImage = () => {
		let src: string = '/static/img/no-image.svg';
		if (item.images.length > 0) {
			src = item.images[0].file_url;
		}

		return src;
	};
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
							src={checkImage()}
							alt=''
							className='offer-block__img'
						/>
						<div className='offer-block__info'>
							<a
								href={`/ad/${item.id}`}
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
