import React from 'react';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import Ads from 'client/ssr/blocks/ads/Ads';
import EmptySearch from 'client/ssr/blocks/empty-search/EmptySearch';
import { IAds } from 'client/common/entities/user/modules/owned-ads/interfaces';
import BreadcrumbsWrap from 'client/ssr/wraps/BreadcrumbFromContext';

interface ISearchPageProp {
	search: IAds[];
}

// TODO: is not page.
class SearchPage extends React.Component<ISearchPageProp> {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<React.Fragment >
				<Header />
				<div className='bottom-header p-y-20' >
					<div className='container' >
						<Navbar />
						<Search priceRange={true} />
						<BreadcrumbsWrap
							classNameForContainer='breadcrumb'
							classNameForItem='breadcrumb-item'
						/>
					</div >
				</div >
				{
					this.props.search.length > 0
						?
						<Ads
							title={`Search result (${this.props.search.length})`}
							ads={this.props.search}
						/>
						:
						<EmptySearch />
				}
				<Footer />
			</React.Fragment >
		);
	}
}

export default SearchPage;