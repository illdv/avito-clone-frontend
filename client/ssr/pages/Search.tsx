import React from 'react';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import Ads from 'client/ssr/blocks/ads/Ads';
import EmptySearch from 'client/ssr/blocks/empty-search/EmptySearch';
import { IAds } from 'client/common/entities/user/modules/owned-ads/interfaces';
import BreadcrumbsWrap from 'client/ssr/wraps/BreadcrumbFromContext';
import ListOfSubcategories from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import { ConsumerCategories } from 'client/ssr/blocks/categories/context';
import { categoryToItemOfTitlesList, countriesToItemOfTitlesList } from 'client/ssr/pages/utils';

export interface ICountriesTotal {
	country_id: number;
	title: string;
	total_ads: number;
}

interface ISearchPageProp {
	search: IAds[];
	countriesTotal: ICountriesTotal[];
}

// TODO: is not page.
class SearchPage extends React.Component<ISearchPageProp> {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		console.log(this.props.countriesTotal);

		const countriesTotals = this.props.countriesTotal.filter(item => item.total_ads !== 0)

		return (
			<React.Fragment >
				<Header />
				<div className='bottom-header p-y-20' >
					<div className='container' >
						<Navbar />
						<Search priceRange={true} />
						<BreadcrumbsWrap
							classNameForContainer='breadcrumb'
							classNameForItem='breadcrumb-item'
						/>
						<ConsumerCategories >
							{(categories: ICategory[]) => (
								<ListOfSubcategories
									title={'All'}
									items={categories.map(categoryToItemOfTitlesList)}
								/>
							)}
						</ConsumerCategories >
						{
							countriesTotals.length > 0
							&&
							<ListOfSubcategories
								title={'Countries'}
								items={countriesTotals.map(countriesToItemOfTitlesList)}
							/>
							||
							null
						}
					</div >
				</div >
				{
					this.props.search.length > 0
						?
						<Ads
							title={`Search result (${this.props.search.length})`}
							ads={this.props.search}
						/>
						:
						<EmptySearch />
				}
				<Footer />
			</React.Fragment >
		);
	}
}

export default SearchPage;