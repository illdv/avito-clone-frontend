import React from 'react';
import 'isomorphic-fetch';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import { SetCategories } from 'client/ssr/blocks/categories/context';

import SearchPage, { ICountriesTotal } from 'client/ssr/pages/Search';
import { IAds } from 'client/common/entities/user/modules/owned-ads/interfaces';
import SetQuery from 'client/ssr/contexts/QueryContext';
import { SetBreadcrumbs } from 'client/ssr/contexts/Breadcrumbs';
import { IPagination } from 'client/ssr/pages/interfacePagination';
import SetSearchUrl from 'client/ssr/contexts/SearchUrlContext';
import { isServer } from 'client/common/utils/utils';
import { ILocationBreadcrumbs, ISearchBreadcrumbs } from 'client/ssr/blocks/search/SearchStateful';
import { useOrDefault } from 'client/spa/profile/utils/createAd';
import { IQuery } from 'client/common/search/interface';
import { queryStringifyPlus } from 'server/router/utils';

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

	extractSearchParam = (location: ILocationBreadcrumbs) => {
		if (location) {
			const newLocation = { ...location };
			delete newLocation.title;
			return newLocation;
		}

		return {};
	}

	createLocationBreadcrumbs = (query: IQuery, location: ILocationBreadcrumbs) => {

		const locationName = useOrDefault(() => location.title, 'World');

		const newQuery = { ...query };
		delete newQuery.city_id;
		delete newQuery.region_id;
		delete newQuery.country_id;
		delete newQuery.category_id;

		const searchParamForLocation = this.extractSearchParam(location);

		return {
			title: `All listings in ${locationName}`,
			href: `/search?${queryStringifyPlus({ ...newQuery, ...searchParamForLocation })}`,
		};
	}

	createBreadcrumbs = (search: ISearch, query: IQuery) => {

		const { total, breadcrumbs }   = search;
		const { location, categories } = breadcrumbs;

		const newQuery = { ...query };
		delete newQuery.category_id;
		delete newQuery.options;

		const categoriesBreadcrumbs = (categories || []).map((item, index) => {

			const href = `/search?${queryStringifyPlus({ ...newQuery, category_id: item.id })}`;
			return {
				title: `${item.title} ${index === categories.length - 1 ? total : ''}`,
				href,
			};
		});


		const locationBreadcrumbs = this.createLocationBreadcrumbs(query, location);

		return [
			locationBreadcrumbs,
			...categoriesBreadcrumbs,
		];
	}

	render() {
		if (!loopState) {
			loopState = this.props;
		}

		const { search, categories, query, countriesTotal, categoriesTotal, searchUrl } = this.props;


		const breadcrumbs = this.createBreadcrumbs(search, query);

		return (
			<SetSearchUrl searchUrl={searchUrl} >
				<SetQuery query={query} >
					<SetCategories categories={categories} >
						<SetBreadcrumbs breadCrumbs={breadcrumbs} >
							<SearchPage search={search} countriesTotal={countriesTotal} categoriesTotal={categoriesTotal} />
						</SetBreadcrumbs >
					</SetCategories >
				</SetQuery >
			</SetSearchUrl >
		);
	}
}

export default withI18next(['page2', 'common'])(Category);