import React from 'react';
import 'isomorphic-fetch';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import { SetCategories } from 'client/ssr/blocks/categories/context';

import SearchPage, { ICountriesTotal } from 'client/ssr/pages/Search';
import { IAds } from 'client/common/entities/user/modules/owned-ads/interfaces';
import SetQuery, { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import { SetBreadcrumbs } from 'client/ssr/contexts/Breadcrumbs';
import { IPagination } from 'client/ssr/pages/interfacePagination';
import SetSearchUrl from 'client/ssr/contexts/SearchUrlContext';
import { isServer } from 'client/common/utils/utils';
import { ISearchBreadcrumbs } from 'client/ssr/blocks/search/SearchStateful';
import { useOrDefault } from 'client/spa/profile/utils/createAd';
import { IQuery } from 'client/common/search/interface';

if (isServer()) {
	types.disableChecking();
}

export interface ISearch {
	ads: IAds[];
	pagination: IPagination;
	vip: IAds[];
	total: number;
	breadcrumbs: ISearchBreadcrumbs;
}

interface ICategoryProps {
	categories: any[];
	search: ISearch;
	query: IQuery;
	countriesTotal: ICountriesTotal[];
	categoriesTotal: any;
	searchUrl: any;
}

let loopState;

class Category extends React.Component<ICategoryProps> {
	static async getInitialProps({ query }) {

		const { categoriesTotal, countriesTotal, query: queryResult, search, categories, location } = query;

		if (!categoriesTotal || !countriesTotal || !queryResult || !search || !categories || !location) {
			return ({
				searchUrl: loopState.searchUrl,
				categoriesTotal: loopState.categoriesTotal,
				countriesTotal: loopState.countriesTotal,
				query: loopState.query,
				search: loopState.search,
				categories: loopState.categories,
				location: loopState.location,
			});
		}

		const result = {
			searchUrl: query.searchUrl,
			categoriesTotal,
			countriesTotal,
			query: queryResult,
			search,
			categories,
			location,
		};

		loopState = result;
		
		return result;
	}

	render() {
		if (!loopState) {
			loopState = this.props;
		}

		const { search, categories, query, countriesTotal, categoriesTotal, searchUrl } = this.props;

		console.log('query = ', query);
		console.log('isServer = ', isServer());
		console.log('render getQueryLoop = ', getQueryLoop());

		const { total, breadcrumbs } = search;

		const locationName    = useOrDefault(() => breadcrumbs.location.title, 'World');

		const categoriesBreadcrumbs = (breadcrumbs.categories || []).map((item, index) => ({
			title: `${item.title} ${index === breadcrumbs.categories.length - 1 ? total : ''}`,
			href: `/search?category_id=${item.id}`,
		}));

		const breadcrumbsItems = [
			{
				title: `All listings in ${locationName}`,
				href: '',
			},
			...categoriesBreadcrumbs,
		];

		return (
			<SetSearchUrl searchUrl={searchUrl} >
				<SetQuery query={query} >
					<SetCategories categories={categories} >
						<SetBreadcrumbs breadCrumbs={breadcrumbsItems} >
							<SearchPage search={search} countriesTotal={countriesTotal} categoriesTotal={categoriesTotal} />
						</SetBreadcrumbs >
					</SetCategories >
				</SetQuery >
			</SetSearchUrl >
		);
	}
}

export default withI18next(['page2', 'common'])(Category);