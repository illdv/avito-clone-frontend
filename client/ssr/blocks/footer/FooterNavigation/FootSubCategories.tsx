import * as React from 'react';
import { ICategory } from 'client/common/categories/interface'

interface IFootCategory {
	subcategories: ICategory[];
}

const FootSubCategories: React.SFC<IFootCategory> = ({ subcategories }) => {
	const subcategoryList = subcategories.map(subcategory => (
		<li key={subcategory.title}>
			<a href={`/category/${encodeURI(subcategory.title)}`}>
				<span>{subcategory.title}</span>
			</a>
		</li>
	));

	return (
		<ul className='list-unstyled top-footer__categories-list'>
			{ subcategories ? subcategoryList : null }
		</ul>
	);
};
export default FootSubCategories;