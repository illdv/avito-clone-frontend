import React from 'react';
import 'isomorphic-fetch';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import { SetBreadcrumbs } from 'client/ssr/contexts/Breadcrumbs';
import { SetCategories } from 'client/ssr/blocks/categories/context';
import { IBreadcrumb } from 'client/ssr/interfaces/breadcrumbs';
import { IAdsProps } from 'client/ssr/blocks/list-of-ads/ListOfAds';

import CategoryPage from 'client/ssr/pages/Category';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

interface ICategoryProps {
	categories: any[];
	idActiveCategory: number;
	breadcrumbs: IBreadcrumb[];
	categoryWithAds: IAdsProps[];
	subcategories: any[];
}

class Category extends React.Component<ICategoryProps> {
	static async getInitialProps({ query }) {
		const breadcrumbs = [{
			title: 'All listings',
			href: '/category',
		}].concat(query.category.breadcrumbs);

		return {
			breadcrumbs,
			subcategories: query.category.subcategories || [],
			categories: query.category.categories,
			idActiveCategory: query.category.idActiveCategory,
		};
	}

	render() {
		const { idActiveCategory, categories, subcategories, breadcrumbs } = this.props;
		return (
			<SetCategories categories={categories}>
				<SetBreadcrumbs breadCrumbs={breadcrumbs}>
					<CategoryPage idActiveCategory={idActiveCategory} subcategories={subcategories} />
				</SetBreadcrumbs>
			</SetCategories>
		);
	}
}

export default withI18next(['page2', 'common'])(Category);