import React from 'react';
import { types } from 'redux-act';

import { withI18next } from '../common/lib/withI18next';

import Header from '../client/ssr/blocks/header/Header';
import Navbar from '../client/ssr/blocks/navbar/Navbar';
import Search from '../client/ssr/blocks/search/Search';
import Ad from '../client/ssr/blocks/ad/Ad';

const isServer: boolean = typeof window === 'undefined';

if (isServer){
    types.disableChecking();
}

class Ads extends React.Component {
	static async getInitialProps({ query }){
		console.log(query);
	}

	render(){
		return (
			<React.Fragment>
				<Header />
				<div className="bottom-header p-y-20">
        			<div className="container">
						<Navbar />
						<Search />
					</div>
				</div>
				<Ad />
			</React.Fragment>
		)
	}
}

export default withI18next(['page2', 'common'])(Ads);