import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Header from '../client/ssr/blocks/header/Header';
import { types } from 'redux-act';
import { ToastContainer } from 'react-toastify';

require('client/spa/pages/Helpers.sass');
require('client/spa/pages/ToolBar.sass');
require('client/spa/pages/MyAds.sass');
require('client/spa/pages/createAd/CreateAd.sass');
require('client/spa/pages/ProfileSettings/ProfileSettings.sass');
require('client/ssr/blocks/footer/Footer.sass');

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

const Profile = dynamic(import('client/spa/pages/Profile') as any, {
	ssr: false,
	loading: () => <h1>Loading SPA</h1>,
});

export default class extends React.Component {
	static async getInitialProps({ query }) {
		return { location: query.location };
	}
	render(){
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
					<Profile />
					<ToastContainer />
				</React.Fragment>
			</div>
		);
	}
}
