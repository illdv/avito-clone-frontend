import React from 'react';

require('./ListOfSubcategories.sass');

const ListOfSubcategories = ({ subcategories }: { subcategories: any[] }) => (
	<div className='row'>
		<div className='col-md-12 '>
			<ul className='list-of-types list-unstyled'>
				{
					subcategories.map(subcategory => (
						<li key={subcategory.id} >
							<a href={`/category/${ subcategory.slug }`}>
								<span>{ subcategory.title }</span>
							</a>
							<span>{ subcategory.total_ads_count }</span>
						</li>
					))
				}
			</ul>
		</div>
	</div>
);

export default ListOfSubcategories;
