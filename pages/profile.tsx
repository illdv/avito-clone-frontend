import React from 'react';
import Head from 'next/head';
import { types } from 'redux-act';

import Profile from 'client/spa/profile/Root';
import { SetCategories } from 'client/ssr/blocks/categories/context';

import * as loaderPrepare from '../client/common/loader-prepare/loaderPrepare';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

interface IProps {
	categories: ICategory[];
	location: any;
}

export default class extends React.Component<IProps> {
	static async getInitialProps({ query }) { // TODO need refactor
		let categories = query.categories;
		let location = query.location;

		if (!categories || typeof categories[0] === 'string') {
			const categoriesResponse = await loaderPrepare.get('categories');
			categories = categoriesResponse.data;
		}

		if (!location) {
			const locationResponse = await await loaderPrepare.get('location');
			location = locationResponse.data;
		}

		return { location, categories };
	}

	render() {
		return (
			<>
				<SetCategories categories={this.props.categories} >
					<Head>
						<meta property='og:description' content='Content' />
						<title>Profile page</title>
					</Head>
					<Profile />
				</SetCategories>
			</>
		);
	}
}
