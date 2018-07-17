import React from 'react';
import Head from 'next/head';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import Header from '../src/ssr/blocks/header/Header';
import Navbar from '../src/ssr/blocks/navbar/Navbar';
import Search from '../src/ssr/blocks/search/Search';
import Categories from '../src/ssr/blocks/categories/Categories';
import ListOfAds from '../src/ssr/blocks/list-of-ads/ListOfAds';
import Footer from '../src/ssr/blocks/footer/Footer';
import { ToastContainer } from 'react-toastify';

const isServer: boolean = typeof window === 'undefined';

if (isServer){
    types.disableChecking();
}

interface IIndexProps {
  t: any;
}

const createAbs = () => ({
	id: String(Math.random()),
	img: 'https://thenypost.files.wordpress.com/2018/04/shooting-toddler-feature.jpg?quality=90&strip=all&w=618&h=410&crop=1',
	info: {
		name: 'Corvete 520, 2018',
		price: '52 000$',
		description: '120 000 m',
		date: 'Yesterday 18:39'
	}
});

const vipAds = [createAbs(), createAbs(), createAbs(), createAbs(), createAbs(), createAbs(), createAbs(), createAbs()]

export class Index extends React.Component<IIndexProps> {
	static async getInitialProps(){
		return null;
	}
	render(){
		return (
			<React.Fragment>
				<Head>
					<meta property="og:description" content='Content' />
					<title>Index page</title>
				</Head>
				<Header />
				<div className="header_bottom p-y-20">
        			<div className="container">
						<Navbar />
						<Search />
					</div>
				</div>
				<Categories />
				<ListOfAds title='Vip ads' ad={ vipAds } />
				<ListOfAds title='Houses, villas, cottages' ad={ vipAds } />
				<Footer />
        <ToastContainer />
			</React.Fragment>
		)
	}
}

export default withI18next(['home', 'common'])(Index);