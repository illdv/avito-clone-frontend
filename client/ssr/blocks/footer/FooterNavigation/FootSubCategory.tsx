import * as React from 'react';
import FootSubCategories from 'client/ssr/blocks/footer/FooterNavigation/FootSubCategories';

interface IFootCategoryList {
	category: ICategory;
}

const FootSubCategory: React.SFC<IFootCategoryList> = ({ category }) => (
	<>
		{
			category.children[0]
				?
				<div className='col-md-4 col-lg-3 top-footer__item'>
					<h5 className='top-footer__title'>{category.title}</h5>
					<FootSubCategories subcategories={category.children} />
				</div>
				:
				null
		}
	</>
);

export default FootSubCategory;
