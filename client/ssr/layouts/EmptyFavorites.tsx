import React from 'react';

const EmptyFavorites = () => (
	<section>
		<div className='container page__container-lg'>
			<h1 className='page__title'>
				You don't have any favorites Ads
			</h1>
			<div className='no-results'>
				<span className='d-block'>
					Try to click on like on any ad.
				</span>
			</div>
		</div>
	</section>
);

export default EmptyFavorites;