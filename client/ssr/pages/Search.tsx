import React from 'react';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Footer from 'client/ssr/blocks/footer/Footer';
import Ads from 'client/ssr/blocks/ads/Ads';
import EmptySearch from 'client/ssr/blocks/empty-search/EmptySearch';
import { IAds } from 'client/common/entities/user/modules/owned-ads/interfaces';
import BreadcrumbsWrap from 'client/ssr/wraps/BreadcrumbFromContext';
import ListOfSubcategories from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import { categoryToItemOfTitlesList, countriesToItemOfTitlesList, getNextLocationName } from 'client/ssr/pages/utils';
import Pagination from 'client/ssr/pages/Pagination';
import { IPagination } from 'client/ssr/pages/interfacePagination';
import { useOrDefault } from 'client/spa/profile/utils/createAd';
import ShowArray from 'client/common/blocks/ShowArray';
import SearchStateful from 'client/ssr/blocks/search/SearchStateful';

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

class SearchPage extends React.Component<ISearchPageProp> {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		const { countriesTotal, search, categoriesTotal } = this.props;

		const countriesTotals = countriesTotal.filter(item => item.total_ads !== 0);

		return (
			<>
				<Header />
				<div className='bottom-header p-y-20' >
					<div className='container' >
						<Navbar />
						<SearchStateful/>
						<BreadcrumbsWrap
							classNameForContainer='breadcrumb'
							classNameForItem='breadcrumb-item'
						/>
						<ShowArray list={categoriesTotal} >
							<ListOfSubcategories
								title={'All'}
								items={categoriesTotal.map(categoryToItemOfTitlesList)}
							/>
						</ShowArray >
						<ShowArray list={countriesTotals} >
							<ListOfSubcategories
								title={getNextLocationName()}
								items={countriesTotals.map(countriesToItemOfTitlesList)}
							/>
						</ShowArray >
					</div >
				</div >
				{
					useOrDefault(() => search.ads.length, 0)
						?
						<div >
							<Ads
								title={`Search result (${search.pagination.total})`}
								ads={search.ads}
							/>
							<div className={'d-flex justify-content-center'} >
								<Pagination pagination={search.pagination} />
							</div >
						</div >
						:
						<EmptySearch />
				}
				<Footer />
			</>
		);
	}
}

export default SearchPage;