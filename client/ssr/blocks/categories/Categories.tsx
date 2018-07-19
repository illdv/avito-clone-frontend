import React from 'react';
import { getCategories } from 'client/ssr/blocks/categories/context';
import CategoryCard from 'client/ssr/blocks/categories/CategoryCard';

require('./Categories.sass');

const Categories: React.SFC<any> = ({ categories }) => {
	return (
		<section className='section-xs'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12 '>
						<h3 className='main-caption'>Categories</h3>
					</div>
				</div>
				<div className='row p-y-20'>
					<div className='col-12'>
						<div className='tiles'>
							<CategoryCard
								category={categories[0]}
								img='/static/img/categories/car.png'
								textAlign='category text-right'
							/>
							<CategoryCard
								category={categories[1]}
								img='/static/img/categories/property.png'
								imageAlign='tile__image right'
								textAlign='category text-left'
							/>
							<CategoryCard
								category={categories[2]}
								vertical={true}
								img='/static/img/categories/dog.png'
								imageAlign='tile__image_vertical'
							/>
							<CategoryCard
								category={categories[3]}
								img='/static/img/categories/mac.png'
								textAlign='category text-left'
								imageAlign='tile__image right'
							/>
							<CategoryCard
								category={categories[4]}
								img='/static/img/categories/kitchen.png'
								textAlign='category text-right'

							/>
							<CategoryCard
								category={categories[5]}
								img='/static/img/categories/shirt.png'
								textAlign='category text-right'
							/>
							<CategoryCard
								category={categories[6]}
								img='/static/img/categories/job.png'
								vertical={true}
								imageAlign='tile__image_vertical'
							/>
							<CategoryCard
								category={categories[7]}
								img='/static/img/categories/work.png'
								textAlign='category text-right'
							/>
							<CategoryCard
								category={categories[8]}
								img='/static/img/categories/tennis.png'
								textAlign='category text-left'
								imageAlign='tile__image right'
							/>

							<div className='tile tile-categories'>
								<div className='tile__inner'>
									<div className='category text-left'>
										<h4 className='category__caption p-b-20'>All categories</h4>
										<a
											href='#'
											className='btn grey-btn'
										>
											Select products
											<span className='p-x-5'>
										<i className='fas fa-arrow-right' />
									</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default getCategories(Categories);