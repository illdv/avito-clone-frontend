import React from 'react';
import Head from 'next/head'

import { withI18next } from '../common/lib/withI18next';

import Header from '../src/ssr/blocks/header/Header';
import Navbar from '../src/ssr/blocks/navbar/Navbar';
import Search from '../src/ssr/blocks/search/Search';
import Categories from '../src/ssr/blocks/categories/Categories';
import AdsSection from '../src/ssr/blocks/ads/AdsSection';
import Footer from '../src/ssr/blocks/footer/Footer';
import ModalWindow from '../src/common/modalWindow/ModalWindow'

interface IIndexProps {
  t: any;
}

let vipAds = [
	{
		id: '234234',
		img: 'https://thenypost.files.wordpress.com/2018/04/shooting-toddler-feature.jpg?quality=90&strip=all&w=618&h=410&crop=1',
		info: {
			name: 'Corvete 520, 2018',
			price: '52 000$',
			description: '120 000 m',
			date: 'Yesterday 18:39'
		}
	}
]

vipAds = vipAds.concat(vipAds, vipAds, vipAds)
vipAds = vipAds.concat(vipAds)

export class Index extends React.Component<IIndexProps> {
	static async getInitialProps(){
		return null;
	}
	render(){
		return (
			<React.Fragment>
				<ModalWindow />
				<Head>
					<meta property="og:description" content='Content' />
					<title>Index page</title>
				</Head>
				<Header />
				<div className="bottom-header p-y-20">
        			<div className="container">
						<Navbar />
						<Search />
					</div>
				</div>
				<Categories />
				<AdsSection title='Vip ads' ad={ vipAds } />
				<AdsSection title='Houses, villas, cottages' ad={ vipAds } />
				<Footer />
			</React.Fragment>
		)
	}
}

export default withI18next(['home', 'common'])(Index);