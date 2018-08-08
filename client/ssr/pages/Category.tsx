import React from 'react';
import { connect } from 'react-redux';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import BreadcrumbsWrap from 'client/ssr/wraps/BreadcrumbFromContext';
import EmptySearch from 'client/ssr/blocks/empty-search/EmptySearch';
import ListOfSubcategories, { ItemOfTitlesList } from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import GroupList from '../blocks/GroupList/GroupList';
import { pushInRouter } from 'client/common/utils/utils';
import { changeCountryLocal } from 'client/common/location/module';
import { categoryToItemOfTitlesList } from 'client/ssr/pages/utils'

export interface IAdGroup {
	title: string;
	id: number;
	ads: IAd[];
}

interface ICategoryPageProps {
	mainCategoryId: number;
	subcategories: ICategory[];
	adGroupList: IAdGroup[];
	changeCountryLocal: (id: string) => void;
}

class Category extends React.Component<ICategoryPageProps> {



	onRedirect = (href: string) => () => {
		pushInRouter(href);
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
							<ListOfSubcategories
								title={'All'}
								items={this.props.subcategories.map(categoryToItemOfTitlesList)}
							/>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	changeCountryLocal: id => dispatch(changeCountryLocal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);