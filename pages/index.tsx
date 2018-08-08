import React from 'react';
import Head from 'next/head';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import Header from '../client/ssr/blocks/header/Header';
import Navbar from '../client/ssr/blocks/navbar/Navbar';
import Search from '../client/ssr/blocks/search/Search';
import { ToastContainer } from 'react-toastify';
import { SetCategories } from 'client/ssr/blocks/categories/context';
import Categories from 'client/ssr/blocks/categories/Categories';
import Footer from 'client/ssr/blocks/footer/Footer';
import Ads from 'client/ssr/blocks/ads/Ads';

import * as loaderPrepare from '../client/common/loader-prepare/loaderPrepare';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

interface IIndexProps {
	categories: ICategory[];
	adsPaginationPage: {
		ads: IAd[];
		vip: IAd[];
	};
	location: any;
}

let loopState: IIndexProps;

export class Index extends React.Component<IIndexProps, IIndexProps> {
	static async getInitialProps({ query }) {
		const {adsPaginationPage, categories, location} = query;

		if (!adsPaginationPage || !categories || !location) {
			console.log('loopState', loopState);
			return ({
				adsPaginationPage: loopState.adsPaginationPage,
				location: loopState.location,
				categories: loopState.categories,
			});
		}

		const result = {
			adsPaginationPage: query.adsPaginationPage,
			categories: query.categories,
		};
		
		return result;
	}

	render() {
		loopState = this.props;
		const { categories, location } = this.props;
		const {ads, vip} = this.props.adsPaginationPage;
		return (
			<React.Fragment>
				<SetCategories categories={categories}>
					<Head>
						<meta
							property='og:description'
							content='Content'
						/>
						<title>Index page</title>
					</Head>
					<Header location={location} />
					<div className='header_bottom p-y-20'>
						<div className='container'>
							<Navbar />
							<Search priceRange={true}/>
						</div>
					</div>
					<Categories />
					<Ads
						title='Vip ads'
						ads={vip}
					/>

					<Ads
						title='Houses, villas, cottages'
						ads={ads}
					/>

					<Footer />
					<ToastContainer />
				</SetCategories>
			</React.Fragment>
		);
	}
}

export default withI18next(['home', 'common'])(Index);
