import React from 'react';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import ListOfAds, { IAds } from 'client/ssr/blocks/list-of-ads/ListOfAds';
import BreadcrumbsWrap from 'client/ssr/wraps/BreadcrumbFromContext';
import EmptySearch from 'client/ssr/blocks/empty-search/EmptySearch';
import ListOfSubcategories from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';


interface adGroup {
	title: string;
	id: number;
	ads: IAds[];
}

interface ICategoryPageProps {
	mainCategoryId: number;
	subcategories: any[];
	adGroupList: adGroup[];
}

class Category extends React.Component<ICategoryPageProps> {

	render() {
		return (
			<React.Fragment>
				<Header />
				<div className='bottom-header p-y-20'>
					<div className='container'>
						<Navbar />
						<Search idActiveCategory={this.props.mainCategoryId} />
					</div>

					<div className='container'>
						<BreadcrumbsWrap
							classNameForContainer='breadcrumb'
							classNameForItem='breadcrumb-item'
						/>
						{
							this.props.subcategories.length > 0 &&
							<ListOfSubcategories subcategories={this.props.subcategories} />
						}
					</div>
				</div>
				{
					this.props.adGroupList &&
					this.props.adGroupList.length > 0
					? (
						this.props.adGroupList.map(category => (
							category.ads.length > 0
								?
									<React.Fragment key={category.id}>
										<ListOfAds
											title={category.title}
											ads={category.ads}
										/>
									</React.Fragment>
								:
									<React.Fragment key={category.id} />
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