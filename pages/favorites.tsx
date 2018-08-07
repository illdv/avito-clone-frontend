import React from 'react';
import Head from 'next/head';

import Header from '../client/ssr/blocks/header/Header';
import { types } from 'redux-act';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Favorites from 'client/spa/pages/favorites/Favorites';

require('client/spa/profile/Helpers.sass');
require('client/spa/profile/blocks/toolbar/Toolbar.sass');
require('client/spa/profile/pages/my-ads/MyAds.sass');
require('client/spa/profile/blocks/manager-ad/ManagerAd.sass');
require('client/spa/pages/favorites/FavoritesPage.sass');

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

export default class extends React.Component {
	static async getInitialProps({ query }) {
		return { location: query.location };
	}

	render() {
		return (
			<div>
				<React.Fragment>
					<Head>
						<meta
							property='og:description'
							content='Content'
						/>
						<title>Index page</title>
					</Head>
					<Header />
					<div className='header_bottom p-y-20'>
						<div className='container'>
							<Navbar />
						</div>
					</div>
					<Favorites />
				</React.Fragment>
			</div>
		);
	}
}