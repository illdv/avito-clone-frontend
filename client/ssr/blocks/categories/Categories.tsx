import React from 'react';
import {getCategories, Category} from 'client/ssr/blocks/categories/context';
import CategoriesList from 'client/ssr/blocks/categories/CategoriesList';

require('./Categories.sass');

interface ICategoriesComponent {
	categoriesByLocation: ICategory[];
}

const Categories: React.SFC<ICategoriesComponent> = ({ categoriesByLocation }) => {
	return (
		<section className='section-xs'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12 '>
						<h3>Categories</h3>
					</div>
				</div>
				<div className='row p-y-20'>
					<div className='col-12'>
						<CategoriesList categories={categoriesByLocation} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Categories;