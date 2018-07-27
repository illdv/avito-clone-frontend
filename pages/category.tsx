import React from 'react';
import 'isomorphic-fetch';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import { SetBreadcrumbs } from 'client/ssr/contexts/Breadcrumbs';
import { SetCategories } from 'client/ssr/blocks/categories/context';
import { IBreadcrumb } from 'client/ssr/interfaces/breadcrumbs';

import CategoryPage from 'client/ssr/pages/Category';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

interface ICategoryProps {
	categories: any[];
	mainCategoryId: number;
	breadcrumbs: IBreadcrumb[];
	adGroupList: any[];
	subcategories: any[];
	mainCategory: any;
}

class Category extends React.Component<ICategoryProps> {
	static async getInitialProps({ query }) {
		const breadcrumbs = [{
			title: `All listings in ${query.location.locationName}`,
			href: '/category',
		}].concat(query.category.breadcrumbs);

		return {
			breadcrumbs,
			subcategories: query.category.subcategories || [],
			categories: query.category.categories || [],
			adGroupList: query.category.adGroupList || [],
			mainCategoryId: query.category.mainCategoryId,
			mainCategory: query.category.mainCategory,
		};
	}

	render() {
		const { mainCategoryId, categories, subcategories, breadcrumbs, adGroupList } = this.props;
		return (
			<SetCategories categories={ categories }>
				<SetBreadcrumbs breadCrumbs={ breadcrumbs }>
					<CategoryPage
						mainCategoryId={ mainCategoryId }
						subcategories={ subcategories }
						adGroupList={ adGroupList }
					/>
				</SetBreadcrumbs>
			</SetCategories>
		);
	}
}

export default withI18next(['page2', 'common'])(Category);