import React from 'react';

const EmptySearch = () => (
	<section className='page'>
		<div className='container page__container-lg'>
			<h1 className='page__title'>
				Nothing found on your request
			</h1>
			<div className='no-results'>
				<span className='d-block'>
					Try to reduce or set the query differently.
				</span>
				<span className='d-block'>
				Set softer restrictions.
				</span>
				<span className='d-block'>
					You can search in another city.
				</span>
				<p>
					Or go to <a href='' className='link'>the page of all the ads</a> for sale.
				</p>
			</div>
		</div>
	</section>
);

export default EmptySearch;