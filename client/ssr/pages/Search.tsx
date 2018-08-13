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
import {
	categoryToItemOfTitlesList,
	countriesToItemOfTitlesList,
	getNextLocationName,
} from 'client/ssr/pages/utils';
import Pagination from 'client/ssr/pages/Pagination';
import { IPagination } from 'client/ssr/pages/interfacePagination';
import { useOrDefault } from 'client/spa/profile/utils/createAd';

export interface ICountriesTotal {
	country_id: number;
	region_id?: number;
	city_id?: number;
	title: string;
	total_ads: number;
}

interface ISearchPageProp {
	search: { ads: IAds[], pagination: IPagination };
	countriesTotal: ICountriesTotal[];
	categoriesTotal: ICategory[];
}

// TODO: is not page.
class SearchPage extends React.Component<ISearchPageProp> {
	render() {
		const { countriesTotal, search, categoriesTotal } = this.props;

		const countriesTotals = countriesTotal.filter(item => item.total_ads !== 0);

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
						{
							categoriesTotal.length > 0
							&&
							<ListOfSubcategories
								title={'All'}
								items={categoriesTotal.map(categoryToItemOfTitlesList)}
							/>
							||
							null
						}
						{
							countriesTotals.length > 0
							&&
							<ListOfSubcategories
								title={getNextLocationName()}
								items={countriesTotals.map(countriesToItemOfTitlesList)}
							/>
							||
							null
						}
					</div >
				</div >
				{
					useOrDefault(() => search.ads.length, 0) ?
						<div >
							<Ads
								title={`Search result (${search.pagination.total})`}
								ads={search.ads}
							/>
							<div className={'d-flex justify-content-center'} >
								<Pagination pagination={search.pagination}/>
							</div >
						</div >
						:
						<EmptySearch />
				}
				<Footer />
			</React.Fragment >
		);
	}
}

export default SearchPage;