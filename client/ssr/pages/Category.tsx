import React from 'react';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import ListOfAds from 'client/ssr/blocks/list-of-ads/ListOfAds';
import Breadcrumbs from 'client/ssr/blocks/breadcrumbs/Breadcrumbs';
import EmptySearch from 'client/ssr/blocks/empty-search/EmptySearch';
import ListOfSubcategories from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';

interface ICategoryPageProps {
	idActiveCategory: number;
	subcategories: any[];
}

class Category extends React.Component<ICategoryPageProps> {
	constructor(props, context) {
		super(props, context);
	}


	render() {
		return (
			<React.Fragment>
				<Header />
				<div className='bottom-header p-y-20'>
					<div className='container'>
						<Navbar />
						<Search idActiveCategory={this.props.idActiveCategory} />
					</div>

					<div className='container'>
						<Breadcrumbs />
						{
							this.props.subcategories.length > 0 &&
							<ListOfSubcategories subcategories={this.props.subcategories} />
						}
					</div>
				</div>
				{
					this.props.subcategories.length > 0
					? (
						this.props.subcategories.map(category => (
							category.ads.length > 0 &&
								<ListOfAds
									title={category.title}
									ads={category.ads}
								/>
							|| null
						))
					)
					: <EmptySearch />
				}
				<Footer />
			</React.Fragment>
		);
	}
}

export default Category;