import React from 'react';
import Head from 'next/head'

import { withI18next } from '../common/lib/withI18next';
import Header from '../src/ssr/modules/header/Root';

interface IIndexProps {
	t: any;
}

export class Index extends React.Component<IIndexProps> {
	static async getInitialProps({ qyery }){

	}
	render(){
		const { t } = this.props;
		return (
			<React.Fragment>
				<Head>
					<meta property="og:description" content='Content' />
					<title>Index page</title>
				</Head>
				<Header />
			</React.Fragment>
		)
	}
}

export default withI18next(['home', 'common'])(Index);