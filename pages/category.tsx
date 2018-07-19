import React from 'react';
import 'isomorphic-fetch';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import { SetCategories } from 'client/ssr/blocks/categories/context';
import Breadcrumbs, { ICrumb } from 'client/ssr/blocks/ad/components/Breadcrumbs';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

interface ICategoryProps {
	categories: any[];
	idActiveCategory: number;
	breadcrumbs: ICrumb[];
}

class Category extends React.Component<ICategoryProps> {
	static async getInitialProps({ query }) {
		const isBreadcrumbs = query.category.breadcrumbs && query.category.breadcrumbs.length > 0;
		
		let breadcrumbs = [{
			name: 'All listings in [&]',
			href: '/category',
		}];
		
		if (isBreadcrumbs) {
			breadcrumbs = breadcrumbs.concat(query.category.breadcrumbs.map((category, index, arr): ICrumb => {
				let totla;
	
				if (index === arr.length - 1) {
					totla = ` ${category.total_ads_count}`;
				}
	
				return {
					name: category.title + (totla || ''),
					href: `/category/${ encodeURI(category.title) }`,
				};
			}));
		}

		return {
			breadcrumbs,
			categories: query.category.categories,
			idActiveCategory: isBreadcrumbs && query.category.breadcrumbs[0].id // First - main category
		};
	}

	render() {
		const { categories } = this.props;
		return (
			<React.Fragment>
				<SetCategories categories={categories}>
					<Header />
					<div className='bottom-header p-y-20'>
						<div className='container'>
							<Navbar />
							<Search idActiveCategory={this.props.idActiveCategory} />
						</div>
						<div className='container'>
							{
								this.props.breadcrumbs &&
								<Breadcrumbs
									breadcrumbs={ this.props.breadcrumbs }
									isLastDisabled={true}
								/>
							}
						</div>
					</div>
					<Footer />
				</SetCategories>
			</React.Fragment>
		);
	}
}

export default withI18next(['page2', 'common'])(Category);