import React from 'react';
import Link from 'next/link';
import Head from 'next/head'

import { withI18next } from '../common/lib/withI18next';

interface IIndexProps {
	t: any;
}

export class Index extends React.Component<IIndexProps> {
	static async getInitialProps({ qyery }){
		return {title: 'Suka'}
	}
	render(){
		const { t } = this.props;
		return (
			<React.Fragment>
				<Head>
					<meta property="og:description" content='Content' />
					<title>Index page</title>
				</Head>
				<h1>{t('welcome')}</h1>
				<p>{t('common:integrates_react-i18next')}</p>
				<Link href='/page2'>
					<a>{t('link.gotoPage2')}</a>
				</Link>
			</React.Fragment>
		)
	}
}

export default withI18next(['home', 'common'])(Index);