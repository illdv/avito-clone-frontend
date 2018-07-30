import React from 'react';
import Head from 'next/head';

import { types } from 'redux-act';
import { ToastContainer } from 'react-toastify';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

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
					<Profile />
					<ToastContainer />
				</React.Fragment>
			</div>
		);
	}
}
