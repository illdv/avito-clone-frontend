import React from 'react';
import 'isomorphic-fetch';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import { SetCategories } from 'client/ssr/blocks/categories/context';

import SearchPage, { ICountriesTotal } from 'client/ssr/pages/Search';
import { IAds } from 'client/common/entities/user/modules/owned-ads/interfaces';
import SetQuery from 'client/ssr/contexts/QueryContext';
import { SetBreadcrumbs } from 'client/ssr/contexts/Breadcrumbs';
import { IPagination } from 'client/ssr/pages/interfacePagination'

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

interface ICategoryProps {
	categories: any[];
	search: { ads: IAds[], pagination: IPagination };
	query: any;
	breadcrumbs: any;
	countriesTotal: ICountriesTotal[];
	categoriesTotal: any;
}

let loopState;

class Category extends React.Component<ICategoryProps> {
	static async getInitialProps({ query }) {

		const {categoriesTotal, countriesTotal, breadcrumbs, query: queryResult, search, categories, location} = query;

		if (!categoriesTotal  || !countriesTotal  || !breadcrumbs  || !queryResult  || !search  || !categories  || !location) {
			return ({
				categoriesTotal: loopState.categoriesTotal,
				countriesTotal: loopState.countriesTotal,
				breadcrumbs: loopState.breadcrumbs,
				query: loopState.query,
				search: loopState.search,
				categories: loopState.categories,
				location: loopState.location,
			});
		}

		return ({
			categoriesTotal,
			countriesTotal,
			breadcrumbs,
			query: queryResult,
			search,
			categories,
			location,
		});
	}

	render() {
		loopState = this.props;
		const { search, categories, query, breadcrumbs, countriesTotal, categoriesTotal } = this.props;
		return (
			<SetQuery query={query} >
				<SetCategories categories={categories} >
					<SetBreadcrumbs breadCrumbs={breadcrumbs} >
						<SearchPage search={search} countriesTotal={countriesTotal} categoriesTotal={categoriesTotal} />
					</SetBreadcrumbs >
				</SetCategories >
			</SetQuery >
		);
	}
}

export default withI18next(['page2', 'common'])(Category);