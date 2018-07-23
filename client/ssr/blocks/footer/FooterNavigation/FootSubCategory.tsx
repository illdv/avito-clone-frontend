import * as React from 'react';
import {ICategory} from 'client/ssr/blocks/categories/interface';
import FootSubCategories from 'client/ssr/blocks/footer/FooterNavigation/FootSubCategories';

interface IFootCategoryList {
	category: ICategory;
}

const FootSubCategory: React.SFC<IFootCategoryList> = ({category}) => {
	const categoryBlock = <div className='col-md-4 col-lg-3 top-footer__item'>
		<h5 className='top-footer__title'>{category.title}</h5>
		<FootSubCategories subcategories={category.children}/>
	</div>;
	return (
		<>
			{category.children[0] ? categoryBlock : null}
		</>
	);
};

export default FootSubCategory;
