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
import { query } from 'server/router/prepares';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

interface IIndexProps {
	t: any;
	categories: ICategory[];
	ads: IAd[];
	location: any;
	vipAds: IAd[];
}

export class Index extends React.Component<IIndexProps> {
	static async getInitialProps({ query }) {
		return ({
			vipAds: query.vipAds,
			ads: query.ads,
			location: query.location,
			categories: query.categories,
		});
	}

	render() {
		const { categories, location, vipAds, ads } = this.props;
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
						ads={vipAds}
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
