import React from 'react';

const like = <img src='/static/img/icons/like.svg' alt='' className='no-results__like'/>;

const EmptyFavorites = () => (
	<section>
		<div className='container page__container-lg'>
			<h1 className='page__title'>
				You have no Favourites Items
			</h1>
			<div className='no-results'>
				<span className='d-block'>
					Click on {like} for add ads in Favourites.
				</span>
			</div>
		</div>
	</section>
);

export default EmptyFavorites;