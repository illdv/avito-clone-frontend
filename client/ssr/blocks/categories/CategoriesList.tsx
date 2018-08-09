import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import CategoryCard from 'client/ssr/blocks/categories/CategoryCard';
import { getLocationState } from 'client/common/store/selectors';
import { IRootState } from 'client/common/store/storeInterface';
import { ILocationStoreState } from 'client/common/location/module';

interface ICategoriesList {
	locationState: ILocationStoreState;
	categories: ICategories;
}

const mapStateToProps = (state: IRootState) => ({
	locationState: getLocationState(state),
});

const BottomButton = ({href}: {href: string}) => (
	<div className='tile tile-categories'>
		<div className='tile__inner'>
			<div className='category text-left'>
				<h4 className='category__caption p-b-20'>All categories</h4>
				<a
					href={ href }
					className='btn grey-btn'
				>
					Select products
					<span className='p-x-5'>
						<i className='fas fa-arrow-right'/>
					</span>
				</a>
			</div>
		</div>
	</div>
);

const getQueryHref = (locationState: ILocationStoreState, category: ICategory|null): string => {
	const { idCity, idRegion, idCountry } = locationState.local;

	const queryData = {};

	if (category) {
		queryData['category_id'] = category.id;
	}

	if (idCity) {
		queryData['city_id'] = idCity;
	} else if (idRegion) {
		queryData['region_id'] = idRegion;
	} else if (idCountry) {
		queryData['country_id'] = idCountry;
	}

	const query = queryString.stringify(queryData);

	return `/search?${query}`;
};

const CategoriesList: React.SFC<ICategoriesList> = ({locationState, categories}) => {
	const error = <div> Category not redy on backend</div>;

	return (
		<div className='tiles'>
			{categories[1] ?
				<CategoryCard
					href={ getQueryHref(locationState, categories[1]) }
					category={categories[1]}
					img='/static/img/categories/car.png'
					textAlign='category text-right'
				/>
				: error
			}
			{categories[5] ?
				<CategoryCard
					href={ getQueryHref(locationState, categories[5]) }
					category={categories[5]}
					img='/static/img/categories/property.png'
					imageAlign='tile__image right'
					textAlign='category text-left'
				/>
				: error
			}
			{categories[7] ?
				<CategoryCard
					href={ getQueryHref(locationState, categories[7]) }
					category={categories[7]}
					vertical={true}
					img='/static/img/categories/dog.png'
					imageAlign='tile__image_vertical'
				/>
				: error
			}
			{categories[2] ?
				<CategoryCard
					href={ getQueryHref(locationState, categories[2]) }
					category={categories[2]}
					img='/static/img/categories/mac.png'
					textAlign='category text-left'
					imageAlign='tile__image right'
				/>
				: error
			}
			{categories[4] ?
				<CategoryCard
					href={ getQueryHref(locationState, categories[4]) }
					category={categories[4]}
					img='/static/img/categories/kitchen.png'
					textAlign='category text-right'

				/>
				: error
			}
			{categories[6] ?
				<CategoryCard
					href={ getQueryHref(locationState, categories[6]) }
					category={categories[6]}
					img='/static/img/categories/shirt.png'
					textAlign='category text-right'
				/>
				: error
			}
			{categories[3] ?
				<CategoryCard
					href={ getQueryHref(locationState, categories[3]) }
					category={categories[3]}
					img='/static/img/categories/job.png'
					vertical={true}
					imageAlign='tile__image_vertical'
				/>
				: error
			}
			{categories[8] ?
				<CategoryCard
					href={ getQueryHref(locationState, categories[8]) }
					category={categories[8]}
					img='/static/img/categories/work.png'
					textAlign='category text-right'
				/>
				: error
			}
			{categories[4] ?
				<CategoryCard
					href={ getQueryHref(locationState, categories[4]) }
					category={categories[4]}
					img='/static/img/categories/tennis.png'
					textAlign='category text-left'
					imageAlign='tile__image right'
				/>
				: error
			}
			<BottomButton
				href={ getQueryHref(locationState, null) }
			/>
		</div>
	);
};

export default connect(mapStateToProps)(CategoriesList);
