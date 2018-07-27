import React from 'react';
import 'isomorphic-fetch';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import { SetCategories } from 'client/ssr/blocks/categories/context';
import { IAds } from 'client/ssr/blocks/ads/ListOfAds';

import SearchPage from 'client/ssr/pages/Search';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

interface ICategoryProps {
	categories: any[];
	search: IAds[];
}

class Category extends React.Component<ICategoryProps> {
	static async getInitialProps({ query }) {

		return {
			search: query.search || [],
			categories: query.categories,
			location: query.location,
		};
	}

	render() {
		const { search, categories } = this.props;
		return (
			<SetCategories categories={ categories }>
				 <SearchPage
					search={search}
				/>
			</SetCategories>
		);
	}
}

export default withI18next(['page2', 'common'])(Category);