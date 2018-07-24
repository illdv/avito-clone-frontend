import React from 'react';
import 'isomorphic-fetch';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import ListOfAds, { IAdsProps } from '../client/ssr/blocks/list-of-ads/ListOfAds';
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
	categoryWithAds: IAdsProps[];
	subcategories: any[];
}


class Category extends React.Component<ICategoryProps> {
	static async getInitialProps({ query }) {
		let breadcrumbs = [{
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
		const { categories, subcategories } = this.props;
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
                    {
						subcategories.length > 0
                        ? (
                            subcategories.map(category => (
								category.ads.length > 0 &&
									<ListOfAds
										title={category.title}
										ads={category.ads}
									/>
								|| null
                            ))
                        )
                        : (
                            <div className='container'>
                                <h1>Ads not found</h1>
                            </div>
                        )
                        
                    }
					<Footer />
				</SetCategories>
			</React.Fragment>
		);
	}
}

export default withI18next(['page2', 'common'])(Category);