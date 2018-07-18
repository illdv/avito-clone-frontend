import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Header from '../client/ssr/blocks/header/Header';

const Profile = dynamic(import('client/spa/pages/Profile'), {
	ssr: false,
	loading: () => <h1>Loading SPA</h1>,
});

export default () => (
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
			<Profile/>
		</React.Fragment>
	</div>
);