import React from 'react';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import BreadcrumbsWrap from 'client/ssr/wraps/BreadcrumbFromContext';
import EmptySearch from 'client/ssr/blocks/empty-search/EmptySearch';
import ListOfSubcategories from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import GroupList from '../blocks/GroupList/GroupList';

export interface IAdGroup {
	title: string;
	id: number;
	ads: IAd[];
}

interface ICategoryPageProps {
	mainCategoryId: number;
	subcategories: any[];
	adGroupList: IAdGroup[];
}

class Category extends React.Component<ICategoryPageProps> {
	render() {
		return (
			<>
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
					this.props.adGroupList && this.props.adGroupList.length > 0
						? <GroupList groupList={this.props.adGroupList} />
						: <EmptySearch />
				}
				<Footer />
			</>
		);
	}
}

export default Category;