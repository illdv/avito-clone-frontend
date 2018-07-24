import React from 'react';
import { Category, getCategories } from 'client/ssr/blocks/categories/context';
import FootSubCategory from 'client/ssr/blocks/footer/FooterNavigation/FootSubCategory';
import { ICategories } from 'client/common/categories/interface'

require('../Footer.sass');

interface IFooterNavigation {
	categories: ICategories;
}

const FooterNavigation: React.SFC<IFooterNavigation> = ({ categories }: { categories: Category }) => {
	return (
		<div className='row'>
			<FootSubCategory category={categories[0]} />
			<FootSubCategory category={categories[1]} />
			<FootSubCategory category={categories[2]} />
			<FootSubCategory category={categories[3]} />
			<FootSubCategory category={categories[4]} />
			<FootSubCategory category={categories[5]} />
			<FootSubCategory category={categories[6]} />
			<FootSubCategory category={categories[7]} />
		</div>
	);
};


export default getCategories(FooterNavigation);