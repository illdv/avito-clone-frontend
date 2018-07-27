import React from 'react';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Footer from 'client/ssr/blocks/footer/Footer';
import ListOfAds, { IAds } from 'client/ssr/blocks/ads/ListOfAds';
import EmptySearch from 'client/ssr/blocks/empty-search/EmptySearch';

interface ISearchPageProp {
	search: IAds[];
}

class SearchPage extends React.Component<ISearchPageProp> {
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
						<Search />
					</div>
				</div>
				{
					this.props.search.length > 0
					?
						<ListOfAds
							title={'Search result'}
							ads={this.props.search}
						/>
					: <EmptySearch />
				}
				<Footer />
			</React.Fragment>
		);
	}
}

export default SearchPage;