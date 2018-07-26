import React from 'react';
import Head from 'next/head';

import Header from '../client/ssr/blocks/header/Header';
import { types } from 'redux-act';
import ToolBar from 'client/spa/pages/ToolBar';
import Favorites from 'client/spa/pages/Favorites/Favorites';


require('client/spa/pages/Helpers.sass');
require('client/spa/pages/ToolBar.sass');
require('client/spa/pages/MyAds.sass');
require('client/spa/pages/createAd/CreateAd.sass');
require('client/spa/pages/Favorites/FavoritesPage.sass');

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
					<ToolBar />
					<Favorites />
				</React.Fragment>
			</div>
		);
	}
}