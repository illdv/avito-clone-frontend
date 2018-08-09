import * as React from 'react';

interface IFootCategory {
	subcategories: ICategory[];
}

const FootSubCategories: React.SFC<IFootCategory> = ({subcategories}) => {
	const subcategoryList = subcategories.map(subcategory => (
		<li key={subcategory.title}>
			<a href={`/search?category_id=${subcategory.id}`}>
				<span>{subcategory.title}</span>
			</a>
		</li>
	));

	return (
		<ul className='list-unstyled m-b-0'>
			{subcategories ? subcategoryList : null}
		</ul>
	);
};
export default FootSubCategories;