import React from 'react';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import BreadcrumbsWrap from 'client/ssr/wraps/BreadcrumbFromContext';
import EmptySearch from 'client/ssr/blocks/empty-search/EmptySearch';
import ListOfSubcategories, { ItemOfTitlesList } from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import GroupList from '../blocks/GroupList/GroupList';
import { ICategory } from 'client/common/_categories/interface';

export interface IAdGroup {
	title: string;
	id: number;
	ads: IAd[];
}

const testDataCountry = [
	{ id: '1', title: 'Test 1', count: 10, href: '/123' },
	{ id: '2', title: 'Test 2', count: 5, href: '/123' },
	{ id: '3', title: 'Test 3', count: 3, href: '/123' },
	{ id: '4', title: 'Test 4', count: 9, href: '/123' },
];

interface ICategoryPageProps {
	mainCategoryId: number;
	subcategories: ICategory[];
	adGroupList: IAdGroup[];
}

class Category extends React.Component<ICategoryPageProps> {

	categoryToItemOfTitlesList = ({ id, title, total_ads_count, slug }: ICategory): ItemOfTitlesList => {
		return { id, title, count: total_ads_count, href: `/category/${ slug }` };
	}

	render() {
		return (
			<>
				<Header />
				<div className='bottom-header p-y-20' >
					<div className='container' >
						<Navbar />
						<Search idActiveCategory={this.props.mainCategoryId} priceRange={true}/>
					</div >

					<div className='container' >
						<BreadcrumbsWrap
							classNameForContainer='breadcrumb'
							classNameForItem='breadcrumb-item'
						/>
						{
							this.props.subcategories.length > 0
							&&
							<>
								<ListOfSubcategories
									title={'All'}
									items={this.props.subcategories.map(this.categoryToItemOfTitlesList)}
								/>
								<ListOfSubcategories
									title={'Country'}
									items={testDataCountry}
								/>
							</>
						}
					</div >
				</div >
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