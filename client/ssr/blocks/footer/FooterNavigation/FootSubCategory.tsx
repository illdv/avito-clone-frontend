import * as React from 'react';
import FootSubCategories from 'client/ssr/blocks/footer/FooterNavigation/FootSubCategories';
import { ICategory } from 'client/common/categories/interface';

interface IFootCategoryList {
	category: ICategory;
}

const FootSubCategory: React.SFC<IFootCategoryList> = ({ category }) => (
	<>
		{
			category.children[0]
				?
				<div className='col-md-3 top-footer__item'>
					<h5 className='top__caption top-footer__title'>{category.title}</h5>
					<FootSubCategories subcategories={category.children} />
				</div>
				:
				null
		}
	</>
);

export default FootSubCategory;
