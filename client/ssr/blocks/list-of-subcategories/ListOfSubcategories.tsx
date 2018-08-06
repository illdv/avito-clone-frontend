import React from 'react';

require('./ListOfSubcategories.sass');

export interface ItemOfTitlesList {
	id: string;
	href: string;
	title: string;
	count: number;
}

export interface ITitlesList {
	items: ItemOfTitlesList[];
	title: string;
}

const TitlesList = ({ items, title }: ITitlesList) => (
	<div className='row'>
		<div>{title}</div>
		<div className='col-md-12 '>
			<ul className='list-of-types list-unstyled'>
				{
					items.map(subcategory => (
						<li key={subcategory.id}>
							<a href={subcategory.href}>
								<span>{subcategory.title}</span>
							</a>
							<span>{subcategory.count}</span>
						</li>
					))
				}
			</ul>
		</div>
	</div>
);

export default TitlesList;
