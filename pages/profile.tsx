import React from 'react';
import Head from 'next/head';
import { types } from 'redux-act';

import Profile from 'client/spa/profile/Root';

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
			<>
				<Head>
					<meta property='og:description' content='Content' />
					<title>Profile page</title>
				</Head>
				<Profile />
			</>
		);
	}
}
